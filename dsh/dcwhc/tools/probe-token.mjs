/**
 * 判断 `-2 prepare failed` 是不是"缺少 context_token"导致的。
 *
 * 背景：微信 iLink 协议的 sendmessage 在有 `context_token`（用户刚发来消息）
 * 时可以正常发出；没有 token 时，服务端需要先"准备"会话上下文，这一步可能
 * 因为对方从未主动发起/超时/被限制而失败，返回 -2。
 *
 * 做法：用 getupdates 从一个很早的游标开始拉，找到你发来的任意一条消息，
 * 拿它的 context_token 再去 send，看 -2 是否消失。
 */

import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')

function readAccount() {
  const lines = readFileSync(join(home, '.credentials.yaml'), 'utf8').split(/\r?\n/)
  let active = false
  const payload = {}
  for (const line of lines) {
    if (/^\s*channel-wechat\//.test(line)) {
      active = true
      continue
    }
    if (!active) continue
    const t = /^\s*botToken:\s*(.+)$/.exec(line)
    if (t !== null && payload.botToken === undefined) payload.botToken = t[1].trim().replace(/^["']|["']$/g, '')
    const u = /^\s*userId:\s*(.+)$/.exec(line)
    if (u !== null && payload.userId === undefined) payload.userId = u[1].trim().replace(/^["']|["']$/g, '')
    if (payload.botToken !== undefined && payload.userId !== undefined) break
  }
  return payload
}

const account = readAccount()
const headers = () => ({
  'Content-Type': 'application/json',
  AuthorizationType: 'ilink_bot_token',
  'X-WECHAT-UIN': Buffer.from(String(Math.floor(Math.random() * 4294967296)), 'utf8').toString('base64'),
  Authorization: `Bearer ${account.botToken}`,
})

/** 用空游标拉一轮，看有没有入站消息能给出 context_token。 */
async function fetchInbound() {
  const res = await fetch('https://ilinkai.weixin.qq.com/ilink/bot/getupdates', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ get_updates_buf: '', base_info: { channel_version: '0.0.0', bot_agent: 'probe' } }),
  })
  const raw = await res.text()
  const parsed = JSON.parse(raw)
  return parsed
}

async function send(text, contextToken) {
  const msg = {
    from_user_id: '',
    to_user_id: account.userId,
    client_id: [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, '0')).join(''),
    message_type: 2,
    message_state: 2,
    item_list: [{ type: 1, text_item: { text } }],
  }
  if (contextToken !== undefined) msg.context_token = contextToken
  const res = await fetch('https://ilinkai.weixin.qq.com/ilink/bot/sendmessage', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ msg, base_info: { channel_version: '0.0.0', bot_agent: 'dsh-channel-wechat' } }),
  })
  const raw = await res.text()
  let parsed = {}
  try {
    parsed = JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { code: parsed.errcode ?? parsed.ret, msg: parsed.errmsg, raw }
}

console.log('=== 1. 拉入站消息，找 context_token ===')
const updates = await fetchInbound()
const msgs = Array.isArray(updates.msgs) ? updates.msgs : []
console.log(`  入站消息数: ${msgs.length}`)

let token
for (const message of msgs) {
  const from = String(message.from_user_id ?? '').trim()
  if (from === account.userId && typeof message.context_token === 'string') {
    token = message.context_token
    console.log(`  找到 token（来自 ${from}，长度 ${token.length}）`)
    break
  }
}

if (token === undefined) {
  console.log('\n  没有可用的 context_token。')
  console.log('  → 请先在手机微信里给这个 bot 发一条任意消息（比如「hi」），再重跑本脚本。')
  console.log('\n=== 2. 无 token 直发的结果（对照）===')
  const result = await send('ping-no-token')
  console.log(`  code=${result.code} ${result.msg ?? ''}`)
  process.exit(2)
}

console.log('\n=== 2. 带 context_token 发送 ===')
const withToken = await send('验证：带 context_token 的发送', token)
console.log(`  code=${withToken.code} ${withToken.msg ?? ''} id=${withToken.id ?? ''}`)
console.log(`  ${withToken.raw.slice(0, 200)}`)

if (withToken.code === undefined || withToken.code === 0) {
  console.log('\n✓ 带 token 能发出去 → 说明 -2 的根因是"缺少 context_token"，不是限流。')
  process.exit(0)
}
console.log('\n✗ 带 token 也失败 → 不是 token 的问题，需要另找原因。')
process.exit(1)
