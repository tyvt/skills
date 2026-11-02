/**
 * 真实卡片链路验证：在进程内用真实的 companion 代码，对着**真实的微信登录**
 * 发一张审批卡，然后模拟微信回执，确认整条闭环。
 *
 * 为什么要单独写：当前会话是 `danger-full-access` + `approval: never`，
 * 根本不会弹审批卡，没法在 GUI 里自然触发。但卡片代码本身可以独立驱动——
 * 它只依赖 ctx.on('approval/request')，不依赖会话的审批策略。
 *
 * 这个脚本会真的往你微信发两条消息（卡片 + 确认），这是验证的代价。
 */

import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')

// ---------------------------------------------------------------- 假 ctx
const handlers = new Map()
const logs = []
let cardPromise

const ctx = {
  logger: () => ({ info: (m) => logs.push(`INFO ${m}`), warn: (m) => logs.push(`WARN ${m}`) }),
  get: (service) => {
    if (service !== 'credentials') return undefined
    return {
      listRecords: async () => [{ key: 'channel-wechat/account' }],
      readRecord: async () => readAccount(),
    }
  },
  on(event, handler) {
    const list = handlers.get(event) ?? []
    list.push(handler)
    handlers.set(event, list)
    return () => handlers.set(event, (handlers.get(event) ?? []).filter((h) => h !== handler))
  },
  effect(fn) {
    fn()
    return () => {}
  },
  inject: () => Promise.resolve(),
}

/** 读真实凭证（只取第一个 channel-wechat 记录）。 */
function readAccount() {
  const text = readFileSync(join(home, '.credentials.yaml'), 'utf8')
  const lines = text.split(/\r?\n/)
  let active = false
  let payload = {}
  for (const line of lines) {
    if (/^\s*channel-wechat\//.test(line)) {
      active = true
      continue
    }
    if (!active) continue
    const token = /^\s*botToken:\s*(.+)$/.exec(line)
    if (token !== null && payload.botToken === undefined) {
      payload.botToken = token[1].trim().replace(/^["']|["']$/g, '')
    }
    const userId = /^\s*userId:\s*(.+)$/.exec(line)
    if (userId !== null && payload.userId === undefined) {
      payload.userId = userId[1].trim().replace(/^["']|["']$/g, '')
    }
    if (payload.botToken !== undefined && payload.userId !== undefined) break
  }
  if (payload.botToken === undefined) throw new Error('凭证里没有可用的 channel-wechat 记录')
  return { payload: { ...payload, baseUrl: 'https://ilinkai.weixin.qq.com' } }
}

// ---------------------------------------------------------------- 跑起来
const { apply } = await import('file:///C:/Users/Administrator/.dsh/dcwhc/lib/index.js')
const { claimInbound } = await import('file:///C:/Users/Administrator/.dsh/dcwhc/lib/upstream-hook.mjs')

apply(ctx, {})

console.log('=== 1. 触发一张审批卡 ===')
// 模拟 DSH 发起审批请求。fake next() 代表"交给 GUI"。
const guiFallback = Symbol('gui')
const request = {
  agent: { session: { id: 'session-card-verify' } },
  toolName: 'write_file',
  reason: '验证微信端回执链路（这是测试，不是真实操作）',
}

const approvalResult = new Promise((resolve) => {
  const handler = (handlers.get('approval/request') ?? [])[0]
  if (handler === undefined) {
    console.error('没有注册 approval/request 处理器')
    resolve(undefined)
    return
  }
  Promise.resolve(handler(request, () => resolve(guiFallback))).then(resolve, (error) => {
    console.error('处理器抛错:', error)
    resolve(undefined)
  })
})

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// 等卡片发出
let claimedCardId
for (let i = 0; i < 100; i += 1) {
  await wait(100)
  const hit = logs.find((line) => line.includes('已推送 card:approval'))
  if (hit !== undefined) break
}

const pushed = logs.find((line) => line.includes('已推送 card:approval'))
console.log(pushed === undefined ? '✗ 卡片没有推送出去' : `✓ ${pushed}`)
if (pushed === undefined) {
  console.log('日志:\n' + logs.join('\n'))
  process.exit(1)
}

console.log('\n=== 2. 模拟你在微信里回复「P1 1」 ===')
const claimed = claimInbound({
  peerId: readAccount().payload.userId,
  text: 'P1 1',
  contextToken: undefined,
})
console.log(claimed ? '✓ 回执被卡片认领' : '✗ 回执没有被认领')

const outcome = await approvalResult
console.log(`\n=== 3. 审批结果 ===`)
console.log(`  返回值: ${typeof outcome === 'symbol' ? 'guiFallback（交回 GUI）' : JSON.stringify(outcome)}`)
console.log(outcome === 'allowed-once' ? '✓ 回放行给原链路' : '✗ 结果不符合预期')

// 确认消息要排队：最小间隔 3s，且可能撞上窗口限流，给足 8s。
await wait(8000)
const ack = logs.find((line) => line.includes('已推送 card:approval:reply'))
console.log(`\n=== 4. 确认消息 ===`)
console.log(ack === undefined ? '✗ 没有发出确认' : `✓ ${ack}`)

console.log('\n=== 完整日志 ===')
console.log(logs.join('\n'))

const ok = outcome === 'allowed-once' && ack !== undefined
console.log(`\n${ok ? '卡片回执闭环验证通过' : '验证未通过'}`)
process.exit(ok ? 0 : 1)
