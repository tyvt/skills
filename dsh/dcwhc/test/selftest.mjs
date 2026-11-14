/**
 * 离线自测：用假的 ctx、假的 fetch 驱动插件，验证
 * 1. 轮次结束会推一条，且只在轮次结束时推；
 * 2. 交互请求只走真正的交互卡，不再以纯文字抄送，也永远不扣住 GUI 的请求；
 * 3. 微信里回复卡片编号不再被「认领」（纯文字抄送已删除）；
 * 4. 限流（`ret=-2`）时熔断，不再把队列拖成小时级；
 * 5. 没登录时明确报错而不是静默丢；
 * 6. 飞书长连接单实例锁：被占用 / 心跳过期 / pid 已死 / 锁文件损坏 / release；
 * 7. 状态接口只增字段、不删字段；
 * 8. 抢不到长连接锁时降级为「仅网页可作答」，并留下可被发现的 error 日志。
 *
 * 用 `node test/selftest.mjs` 跑。不依赖真实 DSH、不联网。
 */

import {
  apply,
  parseCardReply,
  formatApprovalCard,
  formatQuestionCard,
} from '../lib/index.js'
import { acquire as acquireLock, isPidAlive } from '../lib/instance-lock.mjs'
import { claimInbound as upstreamClaim } from '../lib/upstream-hook.mjs'

import { existsSync, mkdirSync, mkdtempSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { cachedContext, rememberContext } from '../lib/context-store.mjs'
process.env.DSH_HOME = mkdtempSync(join(tmpdir(), 'dsh-wechat-selftest-'))

let failures = 0
const checks = []

function check(name, condition, detail) {
  checks.push({ name, ok: Boolean(condition), detail })
  if (!condition) {
    failures += 1
    console.log(`  ✗ ${name}${detail === undefined ? '' : ` — ${detail}`}`)
  } else {
    console.log(`  ✓ ${name}`)
  }
}

const sleepFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** 假 ctx。回执通过 `deliver` 注入，模拟上游插件的 hook 调用。 */
function createCtx({ credentials, connection } = {}) {
  const handlers = new Map()
  const disposed = []
  const ctx = {
    logger: () => ({ info: () => {}, warn: () => {}, debug: () => {} }),
    get(service) {
      if (service === 'credentials') return credentials
      return undefined
    },
    on(event, handler) {
      const list = handlers.get(event) ?? []
      list.push(handler)
      handlers.set(event, list)
      return () => {
        handlers.set(
          event,
          (handlers.get(event) ?? []).filter((item) => item !== handler),
        )
      }
    },
    effect(setup) {
      const teardown = setup()
      if (typeof teardown === 'function') disposed.push(teardown)
      return () => teardown?.()
    },
    inject(_deps, setup) {
      setup({
        get: (service) => (service === 'connection' ? connection : undefined),
        effect: (fn) => fn(),
      })
      return Promise.resolve()
    },
    async emit() {},
  }
  return {
    ctx,
    disposeAll: () => {
      for (const fn of disposed.splice(0)) fn()
    },
    fire(event, ...args) {
      for (const handler of handlers.get(event) ?? []) handler(...args)
    },
    /** 模拟 cordis 的 waterfall：返回第一个非 undefined 的应答。 */
    async waterfall(event, req, fallback) {
      const list = handlers.get(event) ?? []
      let index = 0
      const next = async () => {
        const handler = list[index]
        index += 1
        if (handler === undefined) return fallback()
        return await handler(req, next)
      }
      return await next()
    },
    count: (event) => (handlers.get(event) ?? []).length,
    /** 上游插件收到一条微信文本后调用 hook，正是真实的调用方式。 */
    deliver(peerId, text, contextToken = 'ctx-token') {
      return upstreamClaim({ peerId, text, contextToken })
    },
  }
}

/** 假的登录凭证：`channel-wechat/*` 一条记录。 */
function fakeCredentials({ userId = 'me@im.bot', botToken = 'token-abc' } = {}) {
  const records = [{ key: 'channel-wechat/6f77%40im.bot' }]
  return {
    records,
    async listRecords() {
      return records
    },
    async readRecord() {
      return { payload: { botToken, userId, baseUrl: 'https://example.test' } }
    },
  }
}

/**
 * 拦下所有 fetch，记录发出去的正文。
 * @param options - `failTimes` 前几次直接 500；`ret` 让微信返回指定错误码。
 */
function captureFetch({ failTimes = 0, ret = 0 } = {}) {
  const sent = []
  sent.calls = 0
  let remainingFailures = failTimes
  globalThis.fetch = async (url, init) => {
    sent.calls += 1
    if (remainingFailures > 0) {
      remainingFailures -= 1
      return new Response('boom', { status: 500 })
    }
    const body = JSON.parse(init.body)
    sent.push({
      url,
      text: body.msg.item_list[0].text_item.text,
      to: body.msg.to_user_id,
      contextToken: body.msg.context_token,
    })
    return new Response(JSON.stringify({ ret }), { status: 200 })
  }
  return sent
}

const session = (id, cwd = '/work/demo-project') => ({ id, header: { cwd } })

const turnEnd = (kind, extra = {}) => ({
  type: 'turn/end',
  data: { turn: 1, reason: { kind, ...extra } },
})

const assistant = (text) => ({
  type: 'assistant/message',
  data: { message: { role: 'assistant', content: [{ type: 'text', text }] } },
})

async function main() {
  console.log('\n=== 1. 回执解析 ===')
  check('P1 → id P1', parseCardReply('P1')?.id === 'P1')
  check('p1 1 → 选中 1', parseCardReply('p1 1')?.selections[0] === 1)
  check('P3 1,2 → 两个选择', JSON.stringify(parseCardReply('P3 1,2')?.selections) === '[1,2]')
  check('普通聊天不误判', parseCardReply('P1 是什么') === undefined)
  check('空串不误判', parseCardReply('') === undefined)

  console.log('\n=== 2. 卡片渲染 ===')
  const approval = formatApprovalCard({ id: 'P1', toolName: 'pwsh', reason: '需要写文件' })
  check('审批卡含工具名', approval.includes('pwsh'))
  check('审批卡说明答案在网页', approval.includes('仅通知'))
  check('审批卡有两个选项', approval.includes('1. 放行一次') && approval.includes('2. 拒绝'))
  const question = formatQuestionCard({
    id: 'P2',
    questions: [{ id: 'q1', question: '选哪个方案？', options: [{ label: 'A' }, { label: 'B' }] }],
  })
  check('提问卡含选项编号', question.includes('1. A') && question.includes('2. B'))
  check('提问卡说明答案在网页', question.includes('仅通知'))

  console.log('\n=== 3. 轮次结束推送 ===')
  {
    const sent = captureFetch()
    const harness = createCtx({ credentials: fakeCredentials() })
    apply(harness.ctx, {})
    const target = session('session-aaaaaaaaaaaa-bbbb')
    check('观察消息不抢占聊天', upstreamClaim({ accountId: '6f77@im.bot', peerId: 'me@im.bot', contextToken: 'persisted-context', observeOnly: true }) === false)
    check('缓存不串 bot 账号', cachedContext('another-bot', 'me@im.bot') === undefined)

    // --- context-store 条目上限 200（按 receivedAt 最旧淘汰）---
    // 用独立临时 DSH_HOME，避免污染后续用例依赖的持久化令牌。
    {
      const savedHome = process.env.DSH_HOME
      process.env.DSH_HOME = mkdtempSync(join(tmpdir(), 'dsh-ctxstore-'))
      try {
        for (let i = 0; i < 260; i++) rememberContext({ accountId: 'acc' + i, peerId: 'peer', contextToken: 'tok' + i })
        check('context 最近条目仍可读', cachedContext('acc259', 'peer') === 'tok259')
        check('context 最早条目已淘汰', cachedContext('acc0', 'peer') === undefined)
        rememberContext({ accountId: 'acc259', peerId: 'peer', contextToken: 'tok259b' })
        check('context 同 bot 同 peer 覆盖不重复', cachedContext('acc259', 'peer') === 'tok259b')
      } finally {
        process.env.DSH_HOME = savedHome
      }
    }

    harness.fire('session/event', target, { type: 'turn/start', data: { turn: 1 } })
    harness.fire('session/event', target, assistant('我把配置改好了。'))
    check('轮次进行中不推', sent.length === 0)

    harness.fire('session/event', target, turnEnd('completed'))
    await sleepFor(50)
    check('完成时推一条', sent.length === 1, `实际 ${sent.length}`)
    check('标题是「已完成」', sent[0]?.text.startsWith('【已完成】'), sent[0]?.text?.slice(0, 20))
    check('带上了最后的回答', sent[0]?.text.includes('我把配置改好了'))
    check('发给登录账号', sent[0]?.to === 'me@im.bot')
    check('完成通知携带已保存的令牌', sent[0]?.contextToken === 'persisted-context')
    harness.disposeAll()
  }

  console.log('\n=== 4. 出错与中止 ===')
  {
    const sent = captureFetch()
    const harness = createCtx({ credentials: fakeCredentials() })
    apply(harness.ctx, {})
    const target = session('session-cccc')

    harness.fire(
      'session/event',
      target,
      turnEnd('error', { error: { message: '模型超时', code: 'TIMEOUT' } }),
    )
    await sleepFor(50)
    check('出错推一条', sent.length === 1)
    check('重新加载后错误通知复用持久化令牌', sent[0]?.contextToken === 'persisted-context')
    check('标题是「出错」', sent[0]?.text.startsWith('【出错】'))
    check('带上错误原因', sent[0]?.text.includes('模型超时'))

    harness.fire('session/event', target, turnEnd('aborted', { reason: { kind: 'user' } }))
    await sleepFor(50)
    check('中止默认不推（notify=completed,error）', sent.length === 1, `实际 ${sent.length}`)

    harness.disposeAll()
  }

  console.log('\n=== 5. 交互请求不再以纯文字抄送，也不扣住 GUI ===')
  {
    const sent = captureFetch()
    const harness = createCtx({ credentials: fakeCredentials() })
    apply(harness.ctx, {})
    const target = session('session-dddd')

    // GUI 的应答就是 waterfall 的 fallback。它必须在秒级内拿到请求。
    const approvalHanded = await Promise.race([
      harness.waterfall(
        'approval/request',
        { agent: { session: target }, toolName: 'write_file', reason: '需要写入 index.js' },
        () => 'gui-handed',
      ),
      sleepFor(1000).then(() => 'timeout'),
    ])
    check('GUI 立刻拿到审批', approvalHanded === 'gui-handed', String(approvalHanded))

    const questionHanded = await Promise.race([
      harness.waterfall(
        'user-questions/request',
        {
          agent: { session: target },
          questions: [{ id: 'q1', question: '选哪个方案？', options: [{ label: 'A' }, { label: 'B' }] }],
        },
        () => 'gui-handed',
      ),
      sleepFor(1000).then(() => 'timeout'),
    ])
    check('GUI 立刻拿到提问', questionHanded === 'gui-handed', String(questionHanded))

    // 纯文字抄送已删除：一条都不该发出去。
    await sleepFor(300)
    check('交互请求不再发纯文字抄送', sent.length === 0, `实际 ${sent.length} 条`)
    check('审批卡文字不再出现', !sent.some((item) => item.text.includes('write_file')))
    check('提问卡文字不再出现', !sent.some((item) => item.text.includes('选哪个方案')))

    // 对外契约保留：回执解析入口仍在，但没有卡片被登记，所以不认领、也不回指路。
    check('没有登记卡片时回执不认领', harness.deliver('me@im.bot', 'P1 1') === false)
    await sleepFor(100)
    check('不认领时也不回指路消息', !sent.some((item) => item.text.includes('只是一条通知')))

    harness.disposeAll()
  }

  console.log('\n=== 5b. 普通聊天不被卡片吞掉 ===')
  {
    captureFetch()
    const harness = createCtx({ credentials: fakeCredentials() })
    apply(harness.ctx, {})
    check('普通聊天不认领', harness.deliver('me@im.bot', '今天几号') === false)
    check('不存在的卡片号不认领', harness.deliver('me@im.bot', 'P9 1') === false)
    harness.disposeAll()
  }

  console.log('\n=== 5c. 限流时熔断，不再堆积队列 ===')
  {
    const sent = captureFetch({ ret: -2 })
    const harness = createCtx({ credentials: fakeCredentials() })
    apply(harness.ctx, {})
    harness.fire('session/event', session('session-brk'), turnEnd('completed'))
    await sleepFor(100)
    check('参数被拒绝时不重复发送相同请求', sent.calls === 1, String(sent.calls))

    const before = sent.calls
    harness.fire('session/event', session('session-brk-2'), turnEnd('completed'))
    await sleepFor(400)
    check('冷却期内直接丢弃，不再发请求', sent.calls === before, `${before} → ${sent.calls}`)
    harness.disposeAll()
  }

  console.log('\n=== 6. 没登录时明确失败 ===')
  {
    const sent = captureFetch()
    const harness = createCtx({
      credentials: { listRecords: async () => [], readRecord: async () => undefined },
    })
    apply(harness.ctx, {})
    harness.fire('session/event', session('session-eeee'), turnEnd('completed'))
    await sleepFor(80)
    check('没有目标时不发任何请求', sent.length === 0)
    harness.disposeAll()
  }

  console.log('\n=== 7. 限速不影响顺序 ===')
  {
    const sent = captureFetch()
    const harness = createCtx({ credentials: fakeCredentials() })
    apply(harness.ctx, { minIntervalMs: 30 })
    // 先清空计数：上面几段可能还挂着未完成的确认消息（间隔已提到 3s）。
    await sleepFor(6000)
    sent.length = 0
    const a = session('session-a')
    const b = session('session-b')
    harness.fire('session/event', a, assistant('第一条'))
    harness.fire('session/event', a, turnEnd('completed'))
    harness.fire('session/event', b, assistant('第二条'))
    harness.fire('session/event', b, turnEnd('completed'))
    // 全局串行 + 最小间隔被钳到 3s，两条合计要 6s 以上，给足 8s。
    await sleepFor(8000)
    check('两条都发出', sent.length === 2, `实际 ${sent.length}`)
    check('顺序保持', sent[0]?.text.includes('第一条') && sent[1]?.text.includes('第二条'))
    harness.disposeAll()
  }

  console.log('\n=== 8. 飞书长连接单实例锁 ===')
  {
    const dir = mkdtempSync(join(tmpdir(), 'dsh-ws-lock-'))
    const lockPath = join(dir, 'ws.lock')
    const warnings = []
    const warn = (message, detail) => warnings.push({ message, detail })
    // 关掉心跳定时器，避免测试里出现无关的定时器写入。
    const base = { dir, log: warn, heartbeatMs: 0 }

    const first = acquireLock({ ...base, isAlive: () => true })
    check('首次 acquire 成功', first.ok === true, String(first.reason))
    check('锁文件已写入', existsSync(lockPath))
    const written = JSON.parse(readFileSync(lockPath, 'utf8'))
    check(
      '锁内容含 pid/startedAt/heartbeatAt',
      written.pid === process.pid && typeof written.startedAt === 'number' && typeof written.heartbeatAt === 'number',
      JSON.stringify(written),
    )

    // 换一个「活着但不是自己」的 pid 去抢，应该被挡住。
    const blocked = acquireLock({ ...base, pid: 424242, isAlive: () => true })
    check('锁被占用时 acquire 返回 ok:false', blocked.ok === false, String(blocked.reason))
    check('holder 指向持有者 pid', blocked.holder?.pid === process.pid, JSON.stringify(blocked.holder))
    check('被占用时不改锁文件', JSON.parse(readFileSync(lockPath, 'utf8')).pid === process.pid)

    // 心跳过期：持有者活着但心跳不新鲜 → 抢占。
    writeFileSync(
      lockPath,
      JSON.stringify({ pid: 424242, startedAt: Date.now() - 600_000, heartbeatAt: Date.now() - 600_000 }),
    )
    const stale = acquireLock({ ...base, isAlive: () => true })
    check('心跳过期可抢占', stale.ok === true && /心跳已过期/u.test(String(stale.reason)), String(stale.reason))
    check('抢占后锁归自己', JSON.parse(readFileSync(lockPath, 'utf8')).pid === process.pid)

    // pid 已死 → 抢占。
    writeFileSync(lockPath, JSON.stringify({ pid: 424244, startedAt: Date.now(), heartbeatAt: Date.now() }))
    const dead = acquireLock({ ...base, pid: 424245, isAlive: () => false })
    check('pid 已死可抢占', dead.ok === true && /已退出/u.test(String(dead.reason)), String(dead.reason))
    check('isPidAlive(自己) 为真', isPidAlive(process.pid) === true)

    // release 后别人能拿到。
    check('release 删除锁文件', dead.release() === true && existsSync(lockPath) === false)
    const third = acquireLock({ ...base, pid: 424246, isAlive: () => true })
    check('release 后他人可获取', third.ok === true, String(third.reason))
    third.release()
    check('再次 release 后锁文件消失', existsSync(lockPath) === false)

    // 锁文件损坏 → 绝不能挡住通道启动（宁可双开）。
    writeFileSync(lockPath, 'not-json{')
    const corrupt = acquireLock({ ...base, isAlive: () => true })
    check('锁文件损坏仍返回 ok:true', corrupt.ok === true, String(corrupt.reason))
    check('损坏的锁按失效覆盖', /按失效处理并覆盖/u.test(String(corrupt.reason)), String(corrupt.reason))
    corrupt.release()

    // 目录建不出来（把目录位置占成文件）→ 也按拿到锁处理 + warning。
    const blocker = join(dir, 'blocker')
    writeFileSync(blocker, 'x')
    const broken = acquireLock({ dir: join(blocker, 'nested'), log: warn, isAlive: () => true, heartbeatMs: 0 })
    check('IO 异常时按拿到锁处理', broken.ok === true)
    check(
      'IO 异常记 warning',
      warnings.some((item) => String(item.message).includes('按未加锁继续')),
      JSON.stringify(warnings.slice(0, 2)),
    )
    broken.release()

    // 心跳定时器真的在刷新。
    const beating = acquireLock({ ...base, heartbeatMs: 20 })
    const before = JSON.parse(readFileSync(lockPath, 'utf8')).heartbeatAt
    await sleepFor(90)
    const after = JSON.parse(readFileSync(lockPath, 'utf8')).heartbeatAt
    check('定时器刷新心跳', after > before, `${String(before)} → ${String(after)}`)
    beating.release()
  }

  console.log('\n=== 9. 状态接口只增字段、不删字段 ===')
  {
    captureFetch()
    const routes = new Map()
    const connection = {
      fetch: {
        register(route) {
          routes.set(route.path, route)
          return () => routes.delete(route.path)
        },
      },
    }
    const harness = createCtx({ credentials: fakeCredentials(), connection })
    apply(harness.ctx, {})

    const route = routes.get('/api/channel-wechat-companion/status')
    check('status 路由已注册', route !== undefined)
    const payload = await (await route.fetch()).json()
    check('status 仍然 ok', payload.ok === true)
    for (const field of ['login', 'stats', 'targetsConfigured', 'notify', 'cards', 'pendingCards', 'logPath', 'upstreamHooked', 'queued', 'coolingDown']) {
      check(`status 保留旧字段 ${field}`, field in payload)
    }
    check('status 新增 feishuWsBlocked', 'feishuWsBlocked' in payload && payload.feishuWsBlocked === null)
    check('status 新增 feishuPending', 'feishuPending' in payload)
    check('status 新增 lastCardError', 'lastCardError' in payload && payload.lastCardError === null)
    harness.disposeAll()
  }

  console.log('\n=== 10. 抢不到长连接锁时的降级可观测 ===')
  {
    const dshHome = process.env.DSH_HOME
    const feishuDir = join(dshHome, 'notifications')
    const lockDir = join(dshHome, 'channel-feishu')
    mkdirSync(feishuDir, { recursive: true })
    mkdirSync(lockDir, { recursive: true })
    const configPath = join(feishuDir, 'feishu.json')
    writeFileSync(
      configPath,
      JSON.stringify({ mode: 'app', appId: 'cli_test', appSecret: 'secret', receiveId: 'ou_test', inbound: true }),
    )
    // 锁里放一个「活着但不是自己」的 pid（父进程），模拟另一个实例正持有长连接。
    const lockPath = join(lockDir, 'ws.lock')
    writeFileSync(lockPath, JSON.stringify({ pid: process.ppid, startedAt: Date.now(), heartbeatAt: Date.now() }))

    const routes = new Map()
    const connection = {
      fetch: {
        register(route) {
          routes.set(route.path, route)
          return () => routes.delete(route.path)
        },
      },
    }
    const harness = createCtx({ credentials: fakeCredentials(), connection })
    apply(harness.ctx, {})

    const payload = await (await routes.get('/api/channel-wechat-companion/status').fetch()).json()
    check('status 报告长连接被占用', payload.feishuWsBlocked?.pid === process.ppid, JSON.stringify(payload.feishuWsBlocked))
    check('被占用时本实例不启动桥接', payload.feishuInteractive === false)
    check('被占用时没有飞书待办', Array.isArray(payload.feishuPending) && payload.feishuPending.length === 0)

    const logName = `companion-${new Date().toISOString().slice(0, 10)}.log`
    const logText = readFileSync(join(dshHome, 'channel-wechat-companion', 'log', logName), 'utf8')
    check('日志写明另一个实例已占用长连接', logText.includes('另一个实例已占用飞书长连接'))
    check('日志写明提问/审批不会推到飞书', logText.includes('本实例的提问/审批不会推送到飞书，仅网页可作答'))

    harness.disposeAll()
    check(
      '降级实例退出时不误删别人的锁',
      existsSync(lockPath) && JSON.parse(readFileSync(lockPath, 'utf8')).pid === process.ppid,
    )

    unlinkSync(lockPath)
    unlinkSync(configPath)
  }

  console.log(`\n${failures === 0 ? '全部通过' : `${failures} 项失败`}（共 ${checks.length} 项）\n`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((error) => {
  console.error('自测崩溃：', error)
  process.exit(1)
})
