/**
 * 飞书长连接单实例锁。
 *
 * 背景（真实故障）：同一台机器上先后起了两个 web 进程，两个进程都用同一份
 * `channel-feishu` 凭证去建飞书长连接。飞书把事件投给**其中一个**连接，于是
 * 卡片回调随机落到「另一个」进程：用户在网页里点了卡片，真正收到回调的却是
 * 那个不持有该会话的实例，表现就是「点了没生效」。
 *
 * 这里用一把最朴素的 pid 锁把「谁订阅长连接」这件事收敛成一个：
 *
 * - 锁文件放在 `~/.dsh/channel-feishu/ws.lock`，内容是
 *   `{ pid, startedAt, heartbeatAt, host }`；
 * - 持有者每 15 秒刷新一次 `heartbeatAt`；
 * - 心跳超过 `ttlMs`（默认 60 秒）没刷新，或者持有进程已经不在了
 *   （`process.kill(pid, 0)` 抛 `ESRCH`），就认为锁已失效，后来者直接抢占。
 *
 * **失效策略是刻意的：宁可双开，也不要让通道起不来。**
 * 锁文件损坏、目录建不出来、磁盘只读……任何 IO 异常都不允许抛到主流程，
 * 一律按「拿到了锁」继续启动（只记一条 warning）。用锁换来的最坏结果是两个
 * 实例都订阅（回到故障前的样子），而不是整个飞书通道静默不启动。
 *
 * 同理，锁文件里的 pid 等于**自己**时也直接接管：插件重载（dispose 没跑到、
 * 或者 release 时被别的路径抢先）时，自己绝不能把自己挡在门外。
 *
 * 只依赖 `node:fs`，不 import 插件内部任何模块，方便单测直接驱动。
 *
 * @module dsh-channel-wechat-companion/instance-lock
 */

import { mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { hostname } from 'node:os'
import { join } from 'node:path'

/** 锁文件名（放在 `~/.dsh/channel-feishu/` 下）。 */
export const LOCK_FILE_NAME = 'ws.lock'
/** 心跳多久没刷新就判定持有者已死。 */
export const DEFAULT_TTL_MS = 60_000
/** 持有者刷新心跳的间隔。 */
export const DEFAULT_HEARTBEAT_MS = 15_000

/**
 * 判断一个 pid 是否还活着。
 *
 * `process.kill(pid, 0)` 只做权限/存在性检查，不发信号。`ESRCH` 表示进程
 * 不存在；`EPERM` 表示进程存在但没权限，仍算活着。其它异常按「活着」处理，
 * 因为误判成死会把别人的锁抢掉。
 *
 * @param pid - 目标进程号。
 * @returns 是否存活。
 */
export function isPidAlive(pid) {
  if (typeof pid !== 'number' || !Number.isInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error?.code !== 'ESRCH'
  }
}

/**
 * 读一遍锁文件，不抛异常。
 *
 * @param path - 锁文件绝对路径。
 * @returns `{ kind, holder, reason }`，`kind` 为 `missing` / `corrupt` / `valid`。
 */
export function readLock(path) {
  let text
  try {
    text = readFileSync(path, 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') return { kind: 'missing', reason: '锁文件不存在' }
    return { kind: 'corrupt', reason: `锁文件读取失败：${describe(error)}` }
  }
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch (error) {
    return { kind: 'corrupt', reason: `锁文件不是合法 JSON：${describe(error)}` }
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { kind: 'corrupt', reason: '锁文件内容不是对象' }
  }
  const holder = {
    pid: Number.isInteger(parsed.pid) ? parsed.pid : undefined,
    startedAt: toTimestamp(parsed.startedAt),
    heartbeatAt: toTimestamp(parsed.heartbeatAt),
    host: typeof parsed.host === 'string' ? parsed.host : undefined,
  }
  if (holder.pid === undefined) return { kind: 'corrupt', reason: '锁文件缺少 pid', holder }
  return { kind: 'valid', holder }
}

/**
 * 抢锁。
 *
 * @param options - `dir` 锁目录（必填）；`file` 锁文件名；`ttlMs` 心跳有效期；
 *   `heartbeatMs` 心跳间隔；`log(message, detail)` 记 warning 的回调；
 *   `isAlive`/`now`/`pid` 仅供测试注入。
 * @returns `{ ok, path, holder, reason, degraded, beat, release }`。
 *   `ok:false` 时 `holder` 是当前持有者 `{ pid, heartbeatAt, ... }`。
 */
export function acquire(options = {}) {
  const {
    dir,
    file = LOCK_FILE_NAME,
    ttlMs = DEFAULT_TTL_MS,
    heartbeatMs = DEFAULT_HEARTBEAT_MS,
    isAlive = isPidAlive,
    now = Date.now,
    log,
    pid = process.pid,
  } = options ?? {}

  const warn = (message, detail) => {
    try {
      log?.(message, detail)
    } catch {
      /* 记日志本身不能把主流程带崩 */
    }
  }

  if (typeof dir !== 'string' || dir.trim() === '') {
    warn('单实例锁缺少目录参数，按未加锁继续')
    return degraded('缺少锁目录')
  }

  const path = join(dir, file)
  const startedAt = now()
  const host = safeHostname()
  let timer
  let owned = false

  /** 把一份持有者信息写进锁文件；任何异常都只返回 false，不抛。 */
  function write(payload) {
    const text = `${JSON.stringify(payload)}\n`
    try {
      mkdirSync(dir, { recursive: true })
    } catch (error) {
      warn('创建飞书长连接锁目录失败，按未加锁继续', describe(error))
      return false
    }
    const temp = `${path}.${String(pid)}.tmp`
    try {
      writeFileSync(temp, text, 'utf8')
      renameSync(temp, path)
      return true
    } catch {
      /* 临时文件 + rename 在某些文件系统上不可用，退回直接覆盖写 */
      try {
        writeFileSync(path, text, 'utf8')
        return true
      } catch (error) {
        try {
          unlinkSync(temp)
        } catch {
          /* 临时文件清不掉也无所谓 */
        }
        warn('写飞书长连接锁文件失败，按未加锁继续', describe(error))
        return false
      }
    }
  }

  function degraded(reason) {
    warn(`单实例锁不可用（${reason}）：宁可双开，也不让飞书通道起不来`)
    return { ok: true, degraded: true, path: undefined, reason, beat: () => false, release: () => false }
  }

  const current = readLock(path)
  let reason
  if (current.kind === 'missing') {
    reason = '首次占用'
  } else if (current.kind === 'corrupt') {
    // 锁文件坏了绝不能挡住启动：按过期处理，直接覆盖。
    reason = `${current.reason}，按失效处理并覆盖`
  } else {
    const holder = current.holder
    const beat = holder.heartbeatAt ?? holder.startedAt ?? 0
    const age = now() - beat
    if (holder.pid === pid) {
      reason = '同进程重复占用（插件重载），直接接管'
    } else if (!isAlive(holder.pid)) {
      reason = `持有进程 ${String(holder.pid)} 已退出`
    } else if (beat <= 0) {
      reason = '锁文件没有心跳时间，按失效处理'
    } else if (beat > now() + ttlMs) {
      reason = `心跳时间在未来（${String(beat - now())}ms），按时钟漂移处理`
    } else if (age > ttlMs) {
      reason = `心跳已过期（${String(age)}ms > ${String(ttlMs)}ms）`
    } else {
      return { ok: false, path, holder, reason: '另一个实例正在持有飞书长连接', beat: () => false, release: () => false }
    }
  }

  if (!write({ pid, startedAt, heartbeatAt: now(), host })) return degraded(reason)
  owned = true

  if (Number.isFinite(heartbeatMs) && heartbeatMs > 0) {
    timer = setInterval(() => {
      if (!owned) return
      if (!write({ pid, startedAt, heartbeatAt: now(), host })) {
        // 写不进去就停掉心跳，别每 15 秒刷一条同样的 warning。
        if (timer !== undefined) clearInterval(timer)
        timer = undefined
        owned = false
      }
    }, heartbeatMs)
    timer.unref?.()
  }

  /** 立刻刷一次心跳（不等定时器）。 */
  function beat() {
    if (!owned) return false
    return write({ pid, startedAt, heartbeatAt: now(), host })
  }

  /** 释放：停心跳，且只在 pid 仍然是自己时删锁文件。 */
  function release() {
    if (timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
    if (!owned) return false
    owned = false
    const latest = readLock(path)
    if (latest.kind === 'valid' && latest.holder.pid !== pid) {
      warn('锁已被其他实例接管，跳过删除', latest.holder)
      return false
    }
    try {
      unlinkSync(path)
      return true
    } catch (error) {
      if (error?.code === 'ENOENT') return false
      warn('删除飞书长连接锁文件失败', describe(error))
      return false
    }
  }

  return { ok: true, path, holder: undefined, reason, degraded: false, beat, release }
}

function describe(error) {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

function toTimestamp(value) {
  const num = Number(value)
  return Number.isFinite(num) && num > 0 ? num : undefined
}

function safeHostname() {
  try {
    return hostname()
  } catch {
    return undefined
  }
}
