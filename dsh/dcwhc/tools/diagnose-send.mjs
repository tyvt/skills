/**
 * 二分定位 `-2 prepare failed`：
 *   1. 纯文本最短消息
 *   2. 带 context_token 的消息
 *   3. 换 bot_agent 标识
 *   4. 检查 getupdates 是否还正常
 *
 * 每次只改一个变量，看哪个能让 sendmessage 通过。
 */

import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')

function readAccount() {
  const text = readFileSync(join(home, '.credentials.yaml'), 'utf8')
  const lines = text.split(/\r?\n/)
  let active = false
  const payload = {}
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
  return payload
}

const account = readAccount()
console.log('目标:', account.userId, '| token 长度:', account.botToken?.length)

function headers() {
  return {
    'Content-Type': 'application/json',
    AuthorizationType: 'ilink_bot_token',
    'X-WECHAT-UIN': Buffer.from(String(Math.floor(Math.random() * 4294967296)), 'utf8').toString('base64'),
    Authorization: `Bearer ${account.botToken}`,
  }
}

function body({ text, agent, contextToken }) {
  const msg = {
    from_user_id: '',
    to_user_id: account.userId,
    client_id: [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, '0')).join(''),
    message_type: 2,
    message_state: 2,
    item_list: [{ type: 1, text_item: { text } }],
  }
  if (contextToken !== undefined) msg.context_token = contextToken
  return JSON.stringify({ msg, base_info: { channel_version: '0.0.0', bot_agent: agent } })
}

async function send(label, { text, agent, contextToken }) {
  const res = await fetch('https://ilinkai.weixin.qq.com/ilink/bot/sendmessage', {
    method: 'POST',
    headers: headers(),
    body: body({ text, agent, contextToken }),
  })
  const raw = await res.text()
  let parsed = {}
  try {
    parsed = JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const code = parsed.errcode ?? parsed.ret
  console.log(`\n[${label}]`)
  console.log(`  HTTP ${res.status}  code=${code ?? '(无)'}  ${parsed.errmsg ?? ''}`)
  console.log(`  ${raw.slice(0, 200)}`)
  return { code, raw, id: parsed.message_id }
}

// 先确认 getupdates 还通（凭证有效、游标能推进）
console.log('\n=== 0. 先确认 getupdates 正常 ===')
{
  const res = await fetch('https://ilinkai.weixin.qq.com/ilink/bot/getupdates', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ get_updates_buf: '', base_info: { channel_version: '0.0.0', bot_agent: 'probe' } }),
  })
  const raw = await res.text()
  console.log(`  HTTP ${res.status}  ${raw.slice(0, 160)}`)
}

// 1. 最短纯文本
await send('1. 最短纯文本 / bot_agent=dsh-channel-wechat-companion', {
  text: 'ping',
  agent: 'dsh-channel-wechat-companion',
})
await new Promise((r) => setTimeout(r, 3000))

// 2. 换成上游用的 bot_agent
await send('2. 最短纯文本 / bot_agent=dsh-channel-wechat', {
  text: 'ping2',
  agent: 'dsh-channel-wechat',
})
await new Promise((r) => setTimeout(r, 3000))

// 3. 换一个中性 bot_agent
await send('3. 最短纯文本 / bot_agent=bot', {
  text: 'ping3',
  agent: 'bot',
})
