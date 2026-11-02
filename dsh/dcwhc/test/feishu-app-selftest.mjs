import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { feishuConfig, sendFeishu } from '../lib/feishu.mjs'

process.env.DSH_HOME = mkdtempSync(join(tmpdir(), 'dsh-feishu-app-test-'))
for (const key of Object.keys(process.env)) if (key.startsWith('DSH_FEISHU_')) delete process.env[key]
const dir = join(process.env.DSH_HOME, 'notifications')
mkdirSync(dir)
const path = join(dir, 'feishu.json')
const writeConfig = (value) => writeFileSync(path, JSON.stringify(value))
writeConfig({ mode: 'app', appId: 'app-test' })
assert.throws(feishuConfig, /appSecret/)
const app = { mode: 'app', appId: 'app-test', appSecret: 'secret-test', receiveId: 'ou_receiver', receiveIdType: 'open_id' }
writeConfig(app)
assert.deepEqual(feishuConfig(), app)
writeConfig({ ...app, receiveIdType: 'invalid' })
assert.throws(feishuConfig, /receiveIdType/)
writeConfig(app)
const calls = []
let authCount = 0
let rejectOnce = false
let failAuth = false
let expire = 7200
const originalFetch = globalThis.fetch
globalThis.fetch = async (url, init) => {
  const body = JSON.parse(init.body)
  calls.push({ url, init, body })
  if (url.includes('tenant_access_token/internal')) {
    authCount += 1
    if (failAuth) return Response.json({ code: 10003, msg: 'secret-test should not be logged' })
    assert.ok(body.app_id)
    assert.ok(body.app_secret)
    return Response.json({ code: 0, tenant_access_token: `access-${authCount}`, expire })
  }
  assert.ok(url.endsWith('im/v1/messages?receive_id_type=open_id'))
  assert.equal(body.receive_id, 'ou_receiver')
  assert.equal(body.msg_type, 'text')
  assert.match(JSON.parse(body.content).text, /【DSH】/)
  assert.ok(init.headers.Authorization.startsWith('Bearer access-'))
  if (rejectOnce) {
    rejectOnce = false
    return Response.json({ code: 99991663 })
  }
  return Response.json({ code: 0, data: { message_id: 'test-message' } })
}
try {
  await sendFeishu('完成通知')
  await sendFeishu('需要确认')
  assert.equal(authCount, 1, '同一应用应缓存 access token')
  assert.equal(calls.filter((call) => call.url.includes('im/v1/messages')).length, 2)
  rejectOnce = true
  await sendFeishu('令牌失效后自动刷新')
  assert.equal(authCount, 2)
  assert.equal(calls.at(-1).init.headers.Authorization, 'Bearer access-2')
  await sendFeishu('更换凭据', { ...app, appSecret: 'new-secret' })
  assert.equal(authCount, 3, '更换凭据不能复用旧令牌')
  expire = 0
  await sendFeishu('立即过期', { ...app, appId: 'expiring-app' })
  await sendFeishu('无需用户发消息即可刷新', { ...app, appId: 'expiring-app' })
  assert.equal(authCount, 5)
  failAuth = true
  await assert.rejects(sendFeishu('错误凭据', { ...app, appId: 'bad-app' }), (error) => error.message.includes('10003') && !error.message.includes('secret-test'))
  console.log('飞书私聊回归通过：应用配置、消息格式、接收人、鉴权缓存、自动续期、失效刷新、更换凭据、鉴权失败脱敏。')
} finally {
  globalThis.fetch = originalFetch
}
