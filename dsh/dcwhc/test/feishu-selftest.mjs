import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { apply } from '../lib/index.js'
import { feishuBody, feishuConfig, sendFeishu } from '../lib/feishu.mjs'

process.env.DSH_HOME = mkdtempSync(join(tmpdir(), 'dsh-feishu-test-'))
delete process.env.DSH_FEISHU_WEBHOOK
delete process.env.DSH_FEISHU_SECRET
const configDir = join(process.env.DSH_HOME, 'notifications')
mkdirSync(configDir)
const configPath = join(configDir, 'feishu.json')
const writeConfig = (config) => writeFileSync(configPath, JSON.stringify(config))
assert.equal(feishuConfig(), undefined)
writeConfig({ webhook: 'https://example.com/stolen-hook' })
assert.throws(feishuConfig, /官方/)
writeFileSync(configPath, '{bad-json')
assert.throws(feishuConfig, /JSON/)
writeConfig({ webhook: 'https://open.feishu.cn/open-apis/bot/v2/hook/test-hook', secret: 'test-secret' })
assert.equal(feishuConfig().secret, 'test-secret')
assert.equal(feishuBody('hello').content.text, '【DSH】\nhello')
assert.equal(feishuBody('hello', 'test-secret', 1700000000).timestamp, '1700000000')

const handlers = new Map()
const sent = []
let credentialReads = 0
let code = 0
const originalFetch = globalThis.fetch
globalThis.fetch = async (url, init) => {
  sent.push({ url, body: JSON.parse(init.body) })
  return Response.json({ code })
}
const ctx = {
  get(name) {
    if (name === 'credentials') return {
      listRecords: async () => { credentialReads += 1; return [] },
    }
  },
  logger: () => ({ info() {}, warn() {} }),
  on(event, handler) {
    const list = handlers.get(event) ?? []
    list.push(handler)
    handlers.set(event, list)
    return () => {}
  },
  inject() {},
  effect(fn) { fn() },
}
apply(ctx, {})
const session = { id: 'feishu-test', header: { cwd: '/demo' } }
function fire(event, ...args) {
  for (const handler of handlers.get(event) ?? []) handler(...args)
}
async function waitFor(count) {
  const until = Date.now() + 5000
  while (sent.length < count && Date.now() < until) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(sent.length, count)
}
try {
  fire('session/event', session, { type: 'assistant/message', data: { message: { role: 'assistant', content: [{ type: 'text', text: '修复完成' }] } } })
  fire('session/event', session, { type: 'turn/end', data: { turn: 1, reason: { kind: 'completed' } } })
  await waitFor(1)
  assert.match(sent[0].body.content.text, /已完成/)
  assert.match(sent[0].body.content.text, /修复完成/)
  assert.ok(sent[0].body.sign)

  // 交互请求不再以纯文字抄送：插件不再订阅 approval/request 与
  // user-questions/request（真实交互卡由 feishu-bridge 负责，纯文字那条会让
  // 用户看到两张卡且文字卡点了没反应）。这里按 cordis 的 waterfall 语义验证：
  // handler 链为空时必须走 fallback（GUI 立刻拿到请求），且 sent 不再增长。
  async function waterfall(event, req) {
    const list = handlers.get(event) ?? []
    let index = 0
    let handed = false
    const next = async () => {
      const handler = list[index]
      index += 1
      if (handler === undefined) {
        handed = true
        return 'gui'
      }
      return await handler(req, next)
    }
    const result = await next()
    return { handed, result }
  }

  const question = await waterfall('user-questions/request', {
    agent: { session },
    questions: [{ question: '选哪种？', options: [{ label: 'A' }] }],
  })
  assert.equal(question.handed, true, '提问必须立刻交给 GUI，不等待飞书')
  assert.equal(question.result, 'gui')
  await new Promise((resolve) => setTimeout(resolve, 200))
  assert.equal(sent.length, 1, '提问不再以纯文字抄送到飞书')

  const approval = await waterfall('approval/request', {
    agent: { session },
    toolName: 'deploy',
    reason: '审批测试',
  })
  assert.equal(approval.handed, true, '审批必须立刻交给 GUI，不等待飞书')
  assert.equal(approval.result, 'gui')
  await new Promise((resolve) => setTimeout(resolve, 200))
  assert.equal(sent.length, 1, '审批不再以纯文字抄送到飞书')

  fire('session/event', session, { type: 'turn/end', data: { turn: 2, reason: { kind: 'error', error: { message: '模拟故障' } } } })
  await waitFor(2)
  assert.match(sent[1].body.content.text, /出错/)
  assert.equal(credentialReads, 0, '飞书发送不得读取微信凭据')
  assert.ok(sent.every((e) => e.url.startsWith('https://open.feishu.cn/')))
  code = 19024
  await assert.rejects(sendFeishu('拒绝测试'), /19024/)
  globalThis.fetch = async () => new Response('error', { status: 500 })
  await assert.rejects(sendFeishu('HTTP测试'), /HTTP 500/)
  globalThis.fetch = async () => new Response('not-json')
  await assert.rejects(sendFeishu('响应测试'), /无效 JSON/)
  console.log('飞书回归通过：配置校验、签名、完成/出错推送、交互请求不再以纯文字抄送且不阻塞 GUI、无需微信凭据、错误响应处理。')
} finally {
  globalThis.fetch = originalFetch
}
