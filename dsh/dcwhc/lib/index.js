/**
 * dsh-channel-wechat-companion
 *
 * 让「不是从微信发起的会话」也能被推送到微信。
 *
 * 背景：`dsh-channel-wechat` 只能把消息发回它认识的 peer，而它的
 * `sessionToPeer` 映射只在「微信发来一条消息」之后才有值；所以从浏览器 GUI
 * 发起的会话，插件既不会推回答，也不会转审批卡。本插件补上这一段：
 *
 * 1. `session/event`：轮次结束（完成 / 出错 / 中止）时推一条文本；
 * 2. `approval/request` / `user-questions/request`：GUI 会话的审批卡、提问卡
 *    转发到微信，回复 `P1 1` 即可作答；
 * 3. `/api/channel-wechat-companion/*`：状态、连通性自测、诊断页。
 *
 * 与上游插件是**并列**关系，不改它的任何文件，所以 `pnpm` 升级不会丢。
 * 发送能力建立在它的登录凭证之上：`credentials` 里 `channel-wechat/*` 这条
 * 记录的 `botToken` 就是这个 bot 的发送令牌。
 *
 * @module dsh-channel-wechat-companion
 */

import { appendFileSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { createFeishuBridge } from './feishu-bridge.mjs'
import { feishuConfig, sendFeishu } from './feishu.mjs'
import { cachedContext } from './context-store.mjs'
import { acquire as acquireInstanceLock } from './instance-lock.mjs'
import { Config } from './config.js'
import { install as installUpstreamHook, uninstall as uninstallUpstreamHook } from './upstream-hook.mjs'

export { Config }

/** 本插件的名字，cordis 用它做日志分类与 patch 行 id。 */
export const name = 'channel-wechat-companion'

/** 必须等这些服务就绪才能挂载，否则订阅不上。 */
export const inject = ['sessionPersistence', 'credentials']

const API_PREFIX = '/api/channel-wechat-companion'
// 必须带 `/api` 前缀：harness 的 connection.fetch 只在该前缀下挂路由。
// 写成 `/channel-wechat-companion/console` 会一直 404（上游的面板同样挂在 /api 下）。
const CONSOLE_PATH = `${API_PREFIX}/console`
const CREDENTIAL_SCOPE = 'channel-wechat'
const DEFAULT_BASE_URL = 'https://ilinkai.weixin.qq.com'
// 微信侧对同一 bot 的连续发送很敏感：实测 37 秒内发 6 条之后，所有
// sendmessage 都返回 `-2 prepare failed`，而且持续数分钟。所以最小间隔取
// 3 秒，并且额外做一层「窗口限流」——滑动窗口内条数超限就排队等待。
const MIN_SEND_INTERVAL_MS = 3000
/** 滑动窗口：10 分钟内最多 20 条，超出的排队。 */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_WINDOW_LIMIT = 20
const LOG_RETENTION_MS = 3 * 24 * 60 * 60 * 1000
const SEND_RETRIES = 3
/** -2 is a rejected request, including missing/invalid context; not proof of rate limiting. */
const REJECTED_REQUEST_CODES = new Set([-2])
/** 连续失败几次就熔断：限流期间继续排队只会把队列拖成小时级。`-2` 一次即熔断。 */
const BREAKER_THRESHOLD = 3
/** 熔断冷却时长；期间新消息直接丢弃，不再排队。 */
const BREAKER_COOLDOWN_MS = 10 * 60 * 1000
/** 队列积压上限；超过就丢弃新的，避免旧通知把新卡片压到几十分钟之后。 */
const MAX_QUEUED = 25

/** 轮次结束原因 → 推送标题里的中文标签。 */
const REASON_LABEL = {
  completed: '已完成',
  error: '出错',
  aborted: '已中止',
  blocked: '被阻塞',
  'max-tokens': '超出输出上限',
  interrupted: '被中断',
  forked: '已分叉',
}

/**
 * 挂载入口。
 * @param ctx - cordis 上下文。
 * @param config - 插件配置（本插件自带 patch 行给的默认值，可被 profile 覆盖）。
 */
export function apply(ctx, config) {
  const settings = readSettings(config)
  const bus = createBus({ ctx, settings })

  bus.log('info', 'companion 已启动', {
    notify: [...settings.notify],
    cards: settings.cards,
    peers: settings.peers.length === 0 ? 'auto' : settings.peers,
  })
  // 终端里也留一行：日志文件写不进去时（权限、只读盘）这是唯一的可见证据。
  console.error('[channel-wechat-companion] 已启动')

  const turns = observeTurns({ ctx, bus })
  const cards = observeCards({ ctx, bus })
  ctx.inject(['agents', 'agentDefaultModel'], (scope) => {
    const config = feishuConfig()
    if (config?.mode !== 'app' || !config.inbound) return
    // 长连接只允许一个订阅者。实测两个 web 进程同时持有同一份飞书凭证时，
    // 事件会被投给其中任意一个：卡片回调落到不持有该会话的实例上，用户在
    // 网页里点卡片就是「点了没生效」。所以先抢锁，抢不到就只保留发送能力。
    const lock = acquireFeishuLock(bus)
    bus.feishuWsLock = {
      path: lock.path ?? null,
      held: lock.ok === true && lock.degraded !== true,
      reason: lock.reason ?? null,
      startedAt: lock.holder?.startedAt ?? null,
    }
    scope.effect(() => () => lock.release?.())
    if (lock.ok !== true) {
      bus.feishuWsBlocked = lock.holder ?? { pid: null, heartbeatAt: null }
      bus.log('error', '另一个实例已占用飞书长连接，本实例不重复订阅', bus.feishuWsBlocked)
      // 降级后果必须写清楚：纯文字抄送已经删除，所以本实例的交互请求连飞书都
      // 看不到（网页里仍可正常作答）。这条日志是排查「飞书没收到卡」的唯一线索。
      bus.log('error', '降级：本实例的提问/审批不会推送到飞书，仅网页可作答', {
        feishuWsBlocked: bus.feishuWsBlocked,
        feishuInteractive: false,
      })
      return
    }
    const bridge = createFeishuBridge({ ctx, bus, config })
    bus.feishuInteractive = bridge
    scope.effect(() => () => bridge.dispose())
    void bridge.start().catch(() => bus.log('error', '飞书双向通道启动失败'))
  })

  ctx.inject(['connection'], (injected) => {
    const connection = injected.get('connection')
    if (connection?.fetch === undefined) return
    const disposers = [
      connection.fetch.register({
        path: `${API_PREFIX}/status`,
        methods: ['GET'],
        requestBody: 'buffered',
        fetch: async () => {
          const diagnostics = bus.diagnostics()
          return json({
            ok: true,
            login: await describeLogin(bus),
            ...diagnostics,
            cards: settings.cards,
            pendingCards: cards.pending(),
            feishuInteractive: bus.feishuInteractive?.ready() === true,
            pendingInteractions: bus.feishuInteractive?.pending() || 0,
            // 以下三个字段是新增的，旧字段一律保留：只增不删，向后兼容。
            /** 长连接被别的实例占着时为 `{ pid, heartbeatAt }`，本实例持有时为 null。 */
            feishuWsBlocked: diagnostics.feishuWsBlocked,
            /** 飞书待办：`[{ id, kind, sessionId }]`；桥接没提供 pendingList() 时退回数字。 */
            feishuPending: describeFeishuPending(bus),
            /** 最近一次交互卡发送失败的原因。 */
            lastCardError: diagnostics.lastCardError,
          })
        },
      }),
      connection.fetch.register({
        path: `${API_PREFIX}/test`,
        methods: ['POST'],
        requestBody: 'buffered',
        fetch: async () => {
          const stamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
          const results = await bus.enqueue(`【连通性自测】${stamp}\n来自 channel-wechat-companion。`, 'test')
          return json({ ok: results.some((item) => item.ok === true), results })
        },
      }),
      connection.fetch.register({
        path: `${API_PREFIX}/log`,
        methods: ['GET'],
        requestBody: 'buffered',
        fetch: async () => json({ ok: true, path: bus.logPath(), lines: bus.readLogTail(200) }),
      }),
      connection.fetch.register({
        path: CONSOLE_PATH,
        methods: ['GET'],
        requestBody: 'buffered',
        fetch: async () => new Response(CONSOLE_HTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
        }),
      }),
    ]
    injected.effect(() => () => {
      for (const dispose of disposers) dispose()
    })
    bus.log('info', `诊断页：http://127.0.0.1:3080${CONSOLE_PATH}`)
  })

  // 回执的送达有两条路，互为备份：
  //   1. 上游 hook（首选）：上游轮询拿到消息后先问我们，能带回 context_token；
  //   2. 本地事件（降级）：上游没加载 hook 时仍可用 `channel-wechat-companion/inbound`
  //      注入，代价是回复不带引用。
  // 独立的第二套轮询**故意不做**：同一个 bot 的两个消费者共用一个服务端游标，
  // 会互相当成"已读"，把用户的聊天消息吞掉。
  installUpstreamHook(cards.claim)
  // 只要上游成功加载了本 hook，回执就能带引用送回来。这里给状态接口一个可
  // 观察的标记，升级覆盖上游后 `upstreamHooked` 会变 false 而不是静默失灵。
  bus.setUpstreamHooked(true)
}

/* ------------------------------------------------------------------ *
 * 配置
 * ------------------------------------------------------------------ */

/**
 * 读一遍配置，兼容 schemastery 引用（`.get()`）与裸值两种来源。
 * @param config - 插件收到的配置。
 * @returns 归一化后的设置。
 */
function readSettings(config) {
  const read = (field, fallback) => {
    const value = config?.[field]
    if (value === undefined || value === null) return fallback
    if (typeof value.get === 'function') {
      try {
        return value.get() ?? fallback
      } catch {
        return fallback
      }
    }
    return value
  }

  const modes = String(read('notify', 'completed,error'))
    .split(/[\s,，]+/u)
    .map((part) => part.trim().toLowerCase())
    .filter((part) => part !== '')
  const maxChars = Number(read('maxChars', 1200))
  const minIntervalMs = Number(read('minIntervalMs', 1500))

  return {
    peers: String(read('peers', ''))
      .split(/[\s,，;；]+/u)
      .map((part) => part.trim())
      .filter((part) => part !== ''),
    notify: new Set(modes.length === 0 ? ['completed', 'error'] : modes),
    maxChars: Number.isFinite(maxChars) && maxChars >= 0 ? maxChars : 1200,
    cards: read('cards', true) !== false,
    minIntervalMs:
      Number.isFinite(minIntervalMs) && minIntervalMs > 0
        ? Math.max(MIN_SEND_INTERVAL_MS, minIntervalMs)
        : 1500,
  }
}

/* ------------------------------------------------------------------ *
 * 总线：凭证、发送、限速、日志
 * ------------------------------------------------------------------ */

/**
 * 建一个负责"发出去"的组件。
 *
 * 目标解析顺序：配置写了 `peers` 就用；没写就用扫码登录时记录的 userId。
 * 后者为空说明还没登录完，这时明确报告，而不是静默丢消息。
 *
 * @param options - 上下文与设置。
 */
function createBus({ ctx, settings }) {
  const lastSent = new Map()
  let chain = Promise.resolve()
  /**
   * 滑动窗口内成功发出的时间戳，用于窗口限流。
   *
   * 单个目标的「最小间隔」挡不住短时间多轮齐发：实测 37 秒 6 条就被限流。
   * 窗口限流按"全部成功发送"计数，超限时排队而不是丢弃——这些通知都是有
   * 意义的，晚到比不到好。
   */
  const sendWindow = []
  const stats = {
    attempts: 0,
    sent: 0,
    failed: 0,
    dropped: 0,
    throttled: 0,
    lastError: undefined,
    lastSentAt: undefined,
  }
  let warnedNoLogin = false

  /**
   * 最近一次「交互卡发送失败」的原因。
   *
   * 飞书卡片由桥接自己发（`feishu-bridge.mjs` 记一条 `飞书交互卡发送失败…`
   * 的 error 日志），这里从日志通道回填，不额外 import 桥接的内部结构。
   */
  let lastCardError
  let lastCardErrorAt

  /** 长连接被别的实例占用时记下对方 `{ pid, heartbeatAt }`；本实例持有时为 null。 */
  let feishuWsBlocked = null
  /** 本实例的锁文件信息 `{ path, held, reason, startedAt }`，只用于状态页展示。 */
  let feishuWsLock = null

  /** 连续发送失败次数；到达阈值就进冷却。 */
  let consecutiveFailures = 0
  /** 冷却截止时间戳；期间新消息直接丢弃，不排队。 */
  let cooldownUntil = 0
  /** 当前排队中的消息数。 */
  let queued = 0

  const coolingDown = () => Date.now() < cooldownUntil

  /** 连续失败后暂停推送：限流期间继续排队只会把队列拖成小时级。 */
  function tripBreaker() {
    if (coolingDown()) return
    cooldownUntil = Date.now() + BREAKER_COOLDOWN_MS
    log(
      'error',
      `连续 ${String(consecutiveFailures)} 次发送失败，暂停推送 ${String(Math.round(BREAKER_COOLDOWN_MS / 60_000))} 分钟`,
    )
  }

  /* 日志：独立的目录与文件，和上游插件的日志互不干扰。 */
  const logDir = join(dshHome(), 'channel-wechat-companion', 'log')
  const logFile = join(logDir, `companion-${new Date().toISOString().slice(0, 10)}.log`)
  let logReady = false

  function log(level, message, detail) {
    const line = `${new Date().toISOString()} [${level}] ${message}${
      detail === undefined ? '' : ` ${formatDetail(detail)}`
    }`
    try {
      if (!logReady) {
        mkdirSync(logDir, { recursive: true })
        pruneLogs(logDir)
        logReady = true
      }
      appendFileSync(logFile, `${line}\n`, 'utf8')
    } catch {
      /* 日志失败不能影响主流程 */
    }
    const logger = ctx.logger(name)
    if (level === 'error' || level === 'warn') logger.warn(line)
    else logger.info(line)
    // 交互卡（审批/提问）发送失败时留痕，状态页据此显示 lastCardError。
    if (level === 'error' && /交互卡|卡片/u.test(message)) {
      lastCardError = detail === undefined ? message : `${message}：${formatDetail(detail)}`
      lastCardErrorAt = Date.now()
    }
  }

  function pruneLogs(dir) {
    try {
      const now = Date.now()
      for (const entry of readdirSync(dir)) {
        if (!entry.endsWith('.log')) continue
        const path = join(dir, entry)
        try {
          const stat = readFileSync(path)
          if (stat.length === 0) unlinkSync(path)
        } catch {
          /* 读不了就留着 */
        }
        const stamp = /companion-(\d{4}-\d{2}-\d{2})\.log$/u.exec(entry)?.[1]
        if (stamp === undefined) continue
        const time = Date.parse(`${stamp}T00:00:00Z`)
        if (Number.isFinite(time) && now - time > LOG_RETENTION_MS) unlinkSync(path)
      }
    } catch {
      /* 清理失败可以忽略 */
    }
  }

  function readLogTail(limit) {
    try {
      const text = readFileSync(logFile, 'utf8')
      return text.trimEnd().split('\n').slice(-limit)
    } catch {
      return []
    }
  }

  /**
   * 取当前登录的微信账号。
   * @returns `{ accountId, userId, botToken, baseUrl }`，没登录则 undefined。
   */
  async function currentAccount() {
    const service = ctx.get('credentials')
    if (service === undefined || typeof service.listRecords !== 'function') return undefined
    let records
    try {
      records = await service.listRecords()
    } catch (error) {
      log('error', '读取登录凭证失败', error)
      return undefined
    }
    for (const record of records ?? []) {
      if (typeof record?.key !== 'string' || !record.key.startsWith(`${CREDENTIAL_SCOPE}/`)) continue
      const accountId = decodeAccountKey(record.key.slice(CREDENTIAL_SCOPE.length + 1))
      if (accountId === undefined) continue
      let payload
      try {
        payload = await service.readRecord(record.key)
      } catch {
        continue
      }
      const fields = payload?.payload ?? payload
      if (fields === null || typeof fields !== 'object') continue
      return {
        accountId,
        userId: typeof fields.userId === 'string' ? fields.userId : undefined,
        botToken: typeof fields.botToken === 'string' ? fields.botToken : undefined,
        baseUrl: typeof fields.baseUrl === 'string' ? fields.baseUrl : DEFAULT_BASE_URL,
      }
    }
    return undefined
  }

  /**
   * 解析这次要发给谁。
   * @returns 目标微信 id 列表；空数组表示没法发。
   */  async function resolveTargets() {
    if (feishuConfig()) return ['feishu']
    if (settings.peers.length > 0) return settings.peers
    const account = await currentAccount()
    if (typeof account?.userId === 'string' && account.userId !== '') {
      warnedNoLogin = false
      return [account.userId]
    }
    if (!warnedNoLogin) {
      warnedNoLogin = true
      log('error', '没有可用的推送目标：channel-wechat 未完成扫码登录，且配置里没写 peers')
    }
    return []
  }

  /**
   * 发一条文本，带退避重试。
   * @param peerId - 目标微信 id。
   * @param text - 正文。
   * @returns 是否发出。
   */
  async function sendText(peerId, text, contextToken, metadata) {
    if (peerId === 'feishu') {
      stats.attempts += 1
      try {
        await sendFeishu(text, undefined, metadata)
        stats.sent += 1
        stats.lastSentAt = Date.now()
        stats.lastError = undefined
        consecutiveFailures = 0
        return true
      } catch (error) {
        stats.failed += 1
        stats.lastError = error instanceof Error ? error.message : String(error)
        log('error', '飞书通知发送失败', stats.lastError)
        return false
      }
    }
    const account = await currentAccount()
    if (account?.botToken === undefined) {
      stats.dropped += 1
      stats.lastError = '没有可用的登录凭证'
      return false
    }
    const url = `${withTrailingSlash(account.baseUrl)}ilink/bot/sendmessage`
    const msg = {
      from_user_id: '',
      to_user_id: peerId,
      client_id: createClientId(),
      message_type: 2,
      message_state: 2,
      item_list: [{ type: 1, text_item: { text } }],
    }
    // The context is required for routing, not merely a quote/reply decoration.
    const token = contextToken || cachedContext(account.accountId, peerId)
    if (typeof token === 'string' && token !== '') msg.context_token = token
    const body = JSON.stringify({
      msg,
      base_info: { channel_version: '0.0.0', bot_agent: 'dsh-channel-wechat-companion' },
    })
    for (let attempt = 0; attempt < SEND_RETRIES; attempt += 1) {
      stats.attempts += 1
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            AuthorizationType: 'ilink_bot_token',
            'X-WECHAT-UIN': randomUin(),
            Authorization: `Bearer ${account.botToken}`,
          },
          body,
        })
        const raw = await response.text()
        if (!response.ok) throw new Error(`HTTP ${String(response.status)} ${raw.slice(0, 160)}`)
        let parsed = {}
        try {
          parsed = JSON.parse(raw)
        } catch {
          /* 空响应视为成功 */
        }
        const code = parsed.errcode ?? parsed.ret
        if (typeof code === 'number' && code !== 0) {
          const error = new Error(`ret=${String(code)} ${parsed.errmsg ?? ''}`.trim())
          error.code = code
          throw error
        }
        stats.sent += 1
        stats.lastSentAt = Date.now()
        stats.lastError = undefined
        consecutiveFailures = 0
        return true
      } catch (error) {
        stats.lastError = error instanceof Error ? error.message : String(error)
        const code = error?.code
        const rejected = typeof code === 'number' && REJECTED_REQUEST_CODES.has(code)
        if (rejected) {
          stats.lastError += token
            ? '；微信拒绝了请求，请检查会话令牌是否失效及请求参数（-2 不等同于限流）'
            : '；缺少 context_token，当前通道不能凭登录令牌主动推送'
        }
        if (rejected || code === -14 || attempt === SEND_RETRIES - 1) {
          stats.failed += 1
          consecutiveFailures += 1
          log('error', `发送失败（尝试 ${String(attempt + 1)} 次）→ ${peerId}`, stats.lastError)
          if (rejected || consecutiveFailures >= BREAKER_THRESHOLD) tripBreaker()
          return false
        }
        await sleep(2000 * 2 ** attempt)
      }
    }
    return false
  }

  /**
   * 等窗口腾出空间。
   *
   * 窗口满了就等到最早那条滑出去为止，**不丢消息**。等待期间不阻塞调用方
   * 的其它逻辑：它是 await 在串行队列里的，只影响后续发送的顺序。
   */
  async function awaitWindowSlot() {
    for (;;) {
      const now = Date.now()
      while (sendWindow.length > 0 && now - sendWindow[0] >= RATE_WINDOW_MS) sendWindow.shift()
      if (sendWindow.length < RATE_WINDOW_LIMIT) return
      const waitMs = RATE_WINDOW_MS - (now - sendWindow[0]) + 250
      log('info', `窗口限流：已排队，等待 ${Math.ceil(waitMs / 1000)}s`)
      await sleep(waitMs)
    }
  }

  /**
   * 排队发送：全局串行 + 单目标最小间隔 + 滑动窗口限流。
   * @param text - 正文。
   * @param kind - 分类，只用于日志。
   * @param peers - 指定目标，省略则自动解析。
   * @param contextToken - 要引用的那条微信消息（回执时用）。
   * @returns 每个目标各一条结果。
   */
  function enqueue(text, kind, peers, contextToken, metadata) {
    let usingFeishu
    try {
      usingFeishu = Boolean(feishuConfig())
    } catch (error) {
      stats.failed += 1
      stats.lastError = error.message
      log('error', '通知配置错误', stats.lastError)
      return Promise.resolve([])
    }
    if (coolingDown() && !usingFeishu) {
      stats.dropped += 1
      return Promise.resolve([])
    }
    if (queued >= MAX_QUEUED) {
      stats.dropped += 1
      log('error', `队列已满（${String(queued)} 条），丢弃一条 ${kind} 推送`)
      return Promise.resolve([])
    }
    const work = async () => {
      queued -= 1
      if (coolingDown() && !usingFeishu) {
        stats.dropped += 1
        return []
      }
      const targets = usingFeishu ? ['feishu'] : peers ?? (await resolveTargets())
      if (targets.length === 0) {
        stats.dropped += 1
        log('error', `丢弃一条 ${kind} 推送：没有推送目标`)
        return []
      }
      const results = []
      for (const peerId of targets) {
        if (peerId !== 'feishu') await awaitWindowSlot()
        const since = Date.now() - (lastSent.get(peerId) ?? 0)
        if (since < settings.minIntervalMs) await sleep(settings.minIntervalMs - since)
        const ok = await sendText(peerId, text, contextToken, metadata)
        lastSent.set(peerId, Date.now())
        if (ok) sendWindow.push(Date.now())
        results.push({ peerId, ok })
        if (ok) log('info', `已推送 ${kind} → ${peerId}`)
      }
      return results
    }
    const next = chain.then(work, work)
    queued += 1
    chain = next.then(
      () => undefined,
      () => undefined,
    )
    return next
  }

  /* ---------------- 回执状态 ---------------- */

  /**
   * 回执接入是否就绪。
   *
   * 优先走上游 hook（能带回 context_token，确认消息会引用原消息）；上游没
   * 加载 hook 时退化成只能通过本地事件注入，回复不带引用但仍能生效。
   * 这里不自己再开一条轮询：同一个 bot 的两个消费者共用一个服务端游标，
   * 会互相当成已读，把用户的聊天消息吞掉。
   */
  let upstreamHooked = false
  const setUpstreamHooked = (value) => {
    upstreamHooked = value === true
  }

  /** 供状态接口读取。 */
  const diagnostics = () => ({
    stats: { ...stats },
    targetsConfigured: settings.peers,
    notify: [...settings.notify],
    maxChars: settings.maxChars,
    minIntervalMs: settings.minIntervalMs,
    queued,
    consecutiveFailures,
    coolingDown: coolingDown(),
    logPath: logFile,
    upstreamHooked,
    // 新增字段（只增不删）：长连接归属与交互卡失败原因。
    feishuWsBlocked,
    feishuWsLock,
    lastCardError: lastCardError ?? null,
    lastCardErrorAt: lastCardErrorAt ?? null,
  })

  return {
    log,
    settings,
    logPath: () => logFile,
    readLogTail,
    currentAccount,
    resolveTargets,
    setUpstreamHooked,
    enqueue,
    diagnostics,
    stats,
    /** 交互卡发送失败时也可以显式调用（桥接没走日志通道时用）。 */
    markCardError(reason) {
      lastCardError = reason instanceof Error ? reason.message : String(reason ?? '未知原因')
      lastCardErrorAt = Date.now()
    },
    get feishuWsBlocked() {
      return feishuWsBlocked
    },
    set feishuWsBlocked(value) {
      feishuWsBlocked = value ?? null
    },
    get feishuWsLock() {
      return feishuWsLock
    },
    set feishuWsLock(value) {
      feishuWsLock = value ?? null
    },
  }
}

/* ------------------------------------------------------------------ *
 * 轮次结束 → 微信
 * ------------------------------------------------------------------ */

/**
 * 订阅会话事件，把一轮的结局推出去。
 *
 * 只处理"这一轮以什么结束"，不处理流式增量：一轮里模型会攒几十上百个事件，
 * 逐个推会刷屏，而用户真正想知道的是"做完了没有、有没有出错"。
 *
 * @param options - 上下文与总线。
 * @returns `{ dispose }`。
 */
function observeTurns({ ctx, bus }) {
  /** sessionId → 标题、最近正文、最近错误。 */
  const state = new Map()
  const MAX_TRACKED = 500

  const remember = (key) => {
    let entry = state.get(key)
    if (entry !== undefined) return entry
    entry = { title: undefined, lastText: undefined, lastError: undefined, turns: 0 }
    state.set(key, entry)
    if (state.size > MAX_TRACKED) {
      const oldest = state.keys().next()
      if (!oldest.done) state.delete(oldest.value)
    }
    return entry
  }

  const off = ctx.on('session/event', (session, event) => {
    try {
      handle(session, event)
    } catch (error) {
      bus.log('error', '处理会话事件失败', error)
    }
  })

  /**
   * @param session - 触发事件的会话。
   * @param event - 已提交的会话事件。
   */
  function handle(session, event) {
    const sessionId = String(session?.id ?? '')
    if (sessionId === '') return
    const data = event?.data ?? {}

    switch (event?.type) {
      case 'session/title': {
        const title = extractTitle(data)
        if (title !== undefined) remember(sessionId).title = title
        return
      }
      case 'assistant/message': {
        const text = messageText(data.message ?? data)
        if (text !== undefined && text.trim() !== '') remember(sessionId).lastText = text.trim()
        return
      }
      case 'turn/end': {
        // 子代理（teammate / subagent）的轮次反馈不推到飞书，避免刷屏与打扰。
        // 注意：子代理的提问 / 审批卡片仍按设计推送（见 observeQuestions / observeApprovals），只过滤反馈。
        if (session?.header?.origin === 'subagent') return
        const reason = data?.reason ?? {}
        const kind = typeof reason.kind === 'string' ? reason.kind : 'completed'
        const entry = remember(sessionId)
        entry.turns += 1
        if (kind === 'error') entry.lastError = failureText(reason.error)
        if (!bus.settings.notify.has(kind)) return
        const text = composeTurnMessage({
          kind,
          reason,
          entry,
          session,
          maxChars: bus.feishuInteractive?.ready() ? 0 : bus.settings.maxChars,
        })
        void bus.enqueue(text, `turn:${kind}`, undefined, undefined, { sessionId })
        return
      }
      default:
        return
    }
  }

  return {
    dispose: () => {
      off()
      state.clear()
    },
  }
}

/**
 * 拼一条轮次结束的消息。
 * @returns 微信里要显示的正文。
 */
function composeTurnMessage({ kind, reason, entry, session, maxChars }) {
  const label = REASON_LABEL[kind] ?? kind
  const cwd = session?.header?.cwd ?? session?.cwd
  const title = entry.title ?? lastSegment(cwd) ?? '未命名会话'
  const lines = [`【${label}】${truncate(String(title), 80)}`]
  if (kind === 'error') lines.push(`原因：${truncate(entry.lastError ?? '未提供错误详情', 400)}`)
  if (kind === 'aborted' && typeof reason.reason?.kind === 'string') {
    lines.push(`中止方式：${reason.reason.kind}`)
  }
  if (typeof entry.lastText === 'string' && entry.lastText !== '') {
    lines.push('', truncate(entry.lastText, maxChars))
  }
  lines.push('', `会话 ${tailId(String(session?.id ?? ''))}`)
  return lines.join('\n')
}

/** 从结构化失败里取一段人能读的原因。 */
function failureText(failure) {
  if (failure === undefined || failure === null) return '未提供错误详情'
  if (typeof failure === 'string') return failure
  const message = failure.message
  if (typeof message === 'string' && message.trim() !== '') return message.trim()
  const code = failure.code
  if (typeof code === 'string' && code !== '') return code
  return '未提供错误详情'
}

/* ------------------------------------------------------------------ *
 * 卡片回执
 * ------------------------------------------------------------------ */

/**
 * 卡片回执解析（兼容入口）。
 *
 * 历史上这里会把 GUI 的审批/提问请求**以纯文字**抄送出去，再靠 `P1 1` 这类
 * 回执把用户引回网页。这条路径已经删除，原因有二：
 *
 * 1. 飞书侧现在由 `feishu-bridge.mjs` 直接发真正的交互卡，回调走长连接；再叠
 *    一条纯文字抄送只会让同一张卡出现两次，而文字那条答不了、点了没反应，
 *    本身就是「点了没生效」的一部分。
 * 2. 纯文字抄送要占用发送队列，`-2` 限流时反而把真正的卡片挤到几十分钟后。
 *
 * 保留的是对外契约：`formatApprovalCard` / `formatQuestionCard` /
 * `parseCardReply` 仍导出，`claimInbound`（上游 hook 的回执入口）仍可调用，
 * 只是不再有卡片被登记进来，所以它现在只会返回 false。
 *
 * @param options - 上下文与总线。
 * @returns `{ pending, claim, dispose }`。
 */
function observeCards({ ctx, bus }) {
  /**
   * cardId → 已登记的通知卡片。
   *
   * 纯文字抄送删除后这里不再写入；保留它是因为 `claimInbound` 的对外契约不变
   * （上游 hook 仍在调用），将来若要恢复某条兜底通道可以直接复用。
   */
  const open = new Map()

  /**
   * 处理一条微信回复。由回执轮询器调用。
   *
   * 卡片只是通知：答案必须在 DSH 网页里点。这里回一句指路，免得用户以为
   * 自己在微信里答完了、结果那边一直挂着。
   *
   * @param peerId - 发送者。
   * @param text - 原文。
   * @param contextToken - 要引用的那条消息。
   * @returns 是否被这张卡消费。
   */
  function claimInbound(peerId, text, contextToken) {
    const parsed = parseCardReply(text)
    if (parsed === undefined) return false
    const card = open.get(parsed.id)
    if (card === undefined) return false
    if (card.peerId !== peerId) return false

    clearTimeout(card.timer)
    open.delete(card.id)
    void bus.enqueue(
      `${card.id} 只是一条通知，答案请在 DSH 网页的提问面板里选。`,
      `card:${card.kind}:hint`,
      [peerId],
      contextToken,
    )
    return true
  }

  /** 网关：只有开着卡片功能时才认领回执，否则把回执当普通聊天放过。 */
  function inbound(peerId, text, contextToken) {
    if (!bus.settings.cards) return false
    const claimed = claimInbound(peerId, text, contextToken)
    if (claimed) bus.log('info', '收到一张卡片的回执', { peerId })
    return claimed
  }

  // 备用入口：上游没加载 hook（例如插件被升级覆盖）时，仍可通过这个事件手工
  // 注入回执；只是这种路径下回复没有 context_token，不会引用原消息。
  const offInbound = ctx.on('channel-wechat-companion/inbound', (payload) =>
    inbound(payload?.peerId, payload?.text, payload?.contextToken),
  )

  // 不再订阅 `approval/request` / `user-questions/request`：之前订阅的唯一目的
  // 是在后台抄送一张纯文字卡，然后把请求原样 `next()` 交回。现在既不发也不
  // 认领，订阅本身就成了空转（飞书交互卡由桥接自己的订阅负责，GUI 侧由宿主
  // 自己的面板负责）。

  return {
    pending: () => open.size,
    /** 给上游 hook 用的回执入口（对外契约保留）。 */
    claim: inbound,
    dispose: () => {
      offInbound()
      for (const [, card] of open) clearTimeout(card.timer)
      open.clear()
    },
  }
}

/**
 * 解析 `P1`、`p1 1`、`P3 1,2` 这样的回执。
 * @param text - 原文。
 * @returns `{ id, selections }`，不像回执则 undefined。
 */
export function parseCardReply(text) {
  if (typeof text !== 'string') return undefined
  const match = /^[Pp](\d{1,4})(?:[\s,，]+([\d\s,，]+))?$/u.exec(text.trim())
  if (match === null) return undefined
  const selections = (match[2] ?? '')
    .split(/[\s,，]+/u)
    .map((part) => Number.parseInt(part, 10))
    .filter((value) => Number.isInteger(value) && value > 0)
  return { id: `P${match[1]}`, selections }
}

/** 渲染一张审批卡。 */
export function formatApprovalCard({ id, toolName, reason }) {
  const lines = ['【需要审批】']
  if (typeof toolName === 'string' && toolName.trim() !== '') lines.push(`工具：${toolName.trim()}`)
  if (typeof reason === 'string' && reason.trim() !== '') lines.push(`原因：${truncate(reason.trim(), 400)}`)
  lines.push('', '1. 放行一次', '2. 拒绝', '', `请到 DSH 网页里审批（${id} 仅通知）`)
  return lines.join('\n')
}

/** 渲染一张提问卡。 */
export function formatQuestionCard({ id, questions }) {
  const lines = ['【需要你回答】']
  const list = Array.isArray(questions) ? questions : []
  const multiQuestion = list.length > 1
  list.forEach((question, index) => {
    const prefix = multiQuestion ? `${String(index + 1)}. ` : ''
    if (typeof question.header === 'string' && question.header.trim() !== '') {
      lines.push(`【${question.header.trim()}】`)
    }
    lines.push(`${prefix}${question.question}`)
    if (typeof question.detail === 'string' && question.detail.trim() !== '') {
      lines.push(...indent(truncate(question.detail.trim(), 400)))
    }
    const options = Array.isArray(question.options) ? question.options : []
    options.forEach((option, optionIndex) => {
      lines.push(`  ${String(optionIndex + 1)}. ${option.label}`)
    })
    if (options.length > 0 && question.multiSelect === true) lines.push('  （可多选，用逗号分隔编号）')
  })
  lines.push('', `请到 DSH 网页里作答（${id} 仅通知）`)
  return lines.join('\n')
}

/* ------------------------------------------------------------------ *
 * 工具
 * ------------------------------------------------------------------ */

function json(value) {
  return new Response(JSON.stringify(value), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

async function describeLogin(bus) {
  const account = await bus.currentAccount()
  if (account === undefined) return { loggedIn: false }
  return {
    loggedIn: typeof account.botToken === 'string' && account.botToken !== '',
    accountId: account.accountId,
    userId: account.userId,
  }
}

/**
 * 抢飞书长连接的实例锁（`~/.dsh/channel-feishu/ws.lock`）。
 *
 * 锁只用来避免两个进程重复订阅同一条长连接，**绝不能反过来挡住通道启动**：
 * 任何异常都按「拿到锁」继续，最坏结果是退回双开，而不是飞书整个不启动。
 *
 * @param bus - 总线，用来记日志。
 * @returns acquire() 的结果；失败路径也保证有 `release()`。
 */
function acquireFeishuLock(bus) {
  try {
    const lock = acquireInstanceLock({
      dir: join(dshHome(), 'channel-feishu'),
      log: (message, detail) => bus.log('warn', message, detail),
    })
    bus.log(
      lock.ok === true ? 'info' : 'error',
      `飞书长连接锁：${lock.reason ?? '已处理'}`,
      { path: lock.path ?? null, pid: process.pid, holder: lock.holder ?? null },
    )
    return lock
  } catch (error) {
    bus.log('warn', '飞书长连接锁初始化异常，按未加锁继续（宁可双开）', error)
    return { ok: true, degraded: true, path: undefined, reason: '锁初始化异常', beat: () => false, release: () => false }
  }
}

/**
 * 飞书待办列表。
 *
 * 优先用 `bridge.pendingList()`（`[{ id, kind, sessionId }]`）；桥接还没提供
 * 这个方法时退回 `bridge.pending()` 的**数字**。两种形状都要能显示，调用方按
 * `Array.isArray` 分辨即可。不 import 桥接的内部结构。
 *
 * @param bus - 总线。
 * @returns 数组或数字。
 */
function describeFeishuPending(bus) {
  const bridge = bus.feishuInteractive
  if (bridge === undefined || bridge === null) return []
  try {
    if (typeof bridge.pendingList === 'function') {
      const list = bridge.pendingList()
      if (Array.isArray(list)) {
        return list.map((item) => ({
          id: String(item?.id ?? ''),
          kind: String(item?.kind ?? ''),
          sessionId: String(item?.sessionId ?? ''),
        }))
      }
    }
    if (typeof bridge.pending === 'function') {
      const count = bridge.pending()
      if (typeof count === 'number') return count
    }
  } catch (error) {
    bus.log('warn', '读取飞书待办失败', error)
  }
  return 0
}

/**
 * 从一条入站微信消息里取纯文本。
 *
 * 只看文本项；引用块和被引用内容都不算正文，否则用户引用了卡片再打字时
 * 会把卡片原文当成回复内容再解析一遍。没有文本项（纯图片、纯表情）返回
 * 空串，调用方据此跳过。
 *
 * @param message - `getupdates` 返回的一条原始消息。
 * @returns 正文；没有文本则为空串。
 */
function textOfInbound(message) {
  const items = message?.item_list
  if (!Array.isArray(items)) return ''
  const parts = []
  for (const item of items) {
    if (item?.type !== 1) continue
    const text = item.text_item?.text
    if (typeof text === 'string' && text.trim() !== '') parts.push(text.trim())
  }
  return parts.join('\n')
}

/** 从 message 的 content blocks 里取纯文本。 */function messageText(message) {
  const content = message?.content
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return undefined
  const parts = []
  for (const block of content) {
    if (block?.type === 'text' && typeof block.text === 'string') parts.push(block.text)
  }
  return parts.length === 0 ? undefined : parts.join('\n')
}

/** 从 `session/title` 事件里取标题。 */
function extractTitle(data) {
  if (typeof data?.title === 'string' && data.title.trim() !== '') return data.title.trim()
  if (typeof data?.value === 'string' && data.value.trim() !== '') return data.value.trim()
  return undefined
}

function indent(text) {
  return text.split('\n').map((line) => `  ${line}`)
}

function truncate(text, max) {
  const source = String(text ?? '')
  if (max <= 0 || source.length <= max) return source
  return `${source.slice(0, Math.max(0, max - 1))}…`
}

/** 取路径的最后一段，作为没有标题时的会话名。 */
function lastSegment(path) {
  if (typeof path !== 'string' || path === '') return undefined
  const parts = path.split(/[\\/]/u).filter((part) => part !== '')
  const last = parts.pop()
  return last === undefined ? undefined : truncate(last, 48)
}

function tailId(id) {
  if (id === '') return '未知'
  return id.length <= 12 ? id : id.slice(-12)
}

function formatDetail(detail) {
  if (detail instanceof Error) return detail.message
  if (typeof detail === 'string') return detail
  try {
    return JSON.stringify(detail)
  } catch {
    return String(detail)
  }
}

/**
 * DSH 的 HOME 目录。
 *
 * 必须尊重 `DSH_HOME`：只用 `os.homedir()` 会把日志写进真实的 `~/.dsh`，在
 * 用独立 HOME 做验证、或同一台机器跑多个 profile 时会产生串写。这里与上游
 * 插件（`resolveDshHome`）保持同一套规则：环境变量优先，否则 `~/.dsh`。
 *
 * @returns 绝对的 HOME 路径。
 */
function dshHome() {
  const configured = process.env.DSH_HOME
  if (typeof configured === 'string' && configured.trim() !== '') return configured.trim()
  return join(homedir(), '.dsh')
}

function sleep(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms)
    timer.unref?.()
  })
}

function withTrailingSlash(url) {
  return url.endsWith('/') ? url : `${url}/`
}

/** 把凭证 key 段还原成账号 id；旧格式解不出来就当没有。 */
function decodeAccountKey(segment) {
  try {
    const decoded = decodeURIComponent(segment)
    return decoded === '' ? undefined : decoded
  } catch {
    return undefined
  }
}

function randomUin() {
  return Buffer.from(String(Math.floor(Math.random() * 4294967296)), 'utf8').toString('base64')
}

function createClientId() {
  const bytes = new Uint8Array(16)
  if (typeof globalThis.crypto?.getRandomValues === 'function') globalThis.crypto.getRandomValues(bytes)
  else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256)
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

/** 诊断页：一个按钮看完状态，不依赖 GUI 改造。 */
const CONSOLE_HTML = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>微信推送 · 诊断</title>
<style>
  :root { color-scheme: dark }
  body { margin:0; font:14px/1.6 -apple-system,"Segoe UI","Microsoft YaHei",sans-serif; background:#0f1115; color:#e6e8ee }
  main { max-width:760px; margin:0 auto; padding:32px 20px 64px }
  h1 { font-size:20px; margin:0 0 4px }
  .sub { color:#8b93a7; margin:0 0 24px }
  .card { background:#171a21; border:1px solid #262b36; border-radius:12px; padding:18px 20px; margin-bottom:16px }
  .row { display:flex; justify-content:space-between; gap:16px; padding:7px 0; border-bottom:1px dashed #232833 }
  .row:last-child { border-bottom:0 }
  .k { color:#8b93a7 }
  .ok { color:#5bd67b } .bad { color:#ff6b6b } .muted { color:#8b93a7 }
  button { appearance:none; border:0; border-radius:8px; padding:10px 16px; font-size:14px; cursor:pointer; background:#3b82f6; color:#fff; margin-right:8px }
  button.ghost { background:#242936; color:#cfd5e3 }
  button:disabled { opacity:.5; cursor:default }
  pre { white-space:pre-wrap; word-break:break-word; background:#10131a; border-radius:8px; padding:12px; margin:12px 0 0; max-height:300px; overflow:auto; font-size:12px; color:#aab2c5 }
</style></head>
<body><main>
  <h1>微信推送 · 诊断</h1>
  <p class="sub">channel-wechat-companion：把 GUI 会话的完成/出错与交互卡片推到微信。</p>
  <div class="card">
    <div class="row"><span class="k">插件状态</span><span id="alive" class="muted">读取中…</span></div>
    <div class="row"><span class="k">微信登录</span><span id="login" class="muted">读取中…</span></div>
    <div class="row"><span class="k">推送目标</span><span id="targets" class="muted">读取中…</span></div>
    <div class="row"><span class="k">轮次推送类型</span><span id="notify" class="muted"></span></div>
    <div class="row"><span class="k">卡片转发</span><span id="cards" class="muted"></span></div>
    <div class="row"><span class="k">已发送 / 失败 / 丢弃</span><span id="stats"></span></div>
    <div class="row"><span class="k">待答复卡片</span><span id="pending"></span></div>
    <div class="row"><span class="k">飞书长连接</span><span id="wslock" class="muted">读取中…</span></div>
    <div class="row"><span class="k">飞书待办</span><span id="feishupending"></span></div>
    <div class="row"><span class="k">最近卡片错误</span><span id="carderror"></span></div>
    <div class="row"><span class="k">最近错误</span><span id="error"></span></div>
  </div>
  <div class="card">
    <button id="test">发送一条测试消息</button>
    <button id="refresh" class="ghost">刷新状态</button>
    <pre id="out">点上面按钮试一下。</pre>
  </div>
</main>
<script>
const $ = (id) => document.getElementById(id)
const put = (id, text, cls) => { const el = $(id); el.textContent = text; el.className = cls || 'muted' }
const when = (ms) => {
  if (!ms) return '未知'
  try { return new Date(ms).toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai' }) } catch (e) { return String(ms) }
}
async function status() {
  try {
    const data = await (await fetch('${API_PREFIX}/status', { cache: 'no-store' })).json()
    put('alive', '运行中', 'ok')
    const login = data.login || {}
    put('login', login.loggedIn ? '已登录 · ' + (login.userId || login.accountId) : '未登录 / 凭证失效', login.loggedIn ? 'ok' : 'bad')
    put('targets', (data.targetsConfigured && data.targetsConfigured.length) ? data.targetsConfigured.join(', ') : '自动：登录账号', '')
    put('notify', (data.notify || []).join(', '), '')
    put('cards', data.cards ? '开启' : '关闭', '')
    put('stats', data.stats.sent + ' / ' + data.stats.failed + ' / ' + data.stats.dropped, '')
    put('pending', String(data.pendingCards), '')
    const blocked = data.feishuWsBlocked
    put('wslock', blocked
      ? '被占用，本实例不订阅 · pid ' + (blocked.pid == null ? '?' : blocked.pid) + ' · 心跳 ' + when(blocked.heartbeatAt)
      : '本实例持有', blocked ? 'bad' : 'ok')
    const fp = data.feishuPending
    put('feishupending', Array.isArray(fp)
      ? (fp.length ? fp.map((item) => item.id + ' ' + item.kind + ' ' + item.sessionId).join(' / ') : '无')
      : String(fp == null ? 0 : fp), '')
    put('carderror', data.lastCardError || '无', data.lastCardError ? 'bad' : '')
    put('error', data.stats.lastError || '无', data.stats.lastError ? 'bad' : '')
  } catch (error) {
    put('alive', '不可达：' + error.message, 'bad')
  }
}
$('refresh').onclick = status
$('test').onclick = async () => {
  $('test').disabled = true
  $('out').textContent = '发送中…'
  try {
    const res = await fetch('${API_PREFIX}/test', { method: 'POST' })
    $('out').textContent = JSON.stringify(await res.json(), null, 2)
  } catch (error) {
    $('out').textContent = '失败：' + error.message
  } finally {
    $('test').disabled = false
    status()
  }
}
status()
</script>
</body></html>`
