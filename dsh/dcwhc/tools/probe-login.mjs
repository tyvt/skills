/**
 * 只读探测：用现有凭证调一次 getupdates，判断登录是否还有效。
 *
 * 与 send 的区别：`-14 session timeout` 在 sendmessage 上表示"这条会话窗口
 * 过期"，在 getupdates 上才更接近"登录态失效"。先分清是哪一种，再决定是让
 * 你重新扫码还是别的原因。
 */

import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')

function readAccounts() {
  const text = readFileSync(join(home, '.credentials.yaml'), 'utf8')
  const lines = text.split(/\r?\n/)
  const accounts = []
  let current
  for (const line of lines) {
    const head = /^\s*(channel-wechat\/\S+):\s*$/.exec(line)
    if (head !== null) {
      current = { key: head[1] }
      accounts.push(current)
      continue
    }
    if (current === undefined) continue
    const botToken = /^\s*botToken:\s*(.+)$/.exec(line)
    if (botToken !== null && current.botToken === undefined) {
      current.botToken = botToken[1].trim().replace(/^["']|["']$/g, '')
    }
    const userId = /^\s*userId:\s*(.+)$/.exec(line)
    if (userId !== null && current.userId === undefined) {
      current.userId = userId[1].trim().replace(/^["']|["']$/g, '')
    }
  }
  return accounts
}

const accounts = readAccounts()
console.log(`凭证里发现 ${accounts.length} 个 channel-wechat 账号\n`)

for (const account of accounts) {
  console.log(`--- ${account.key} ---`)
  console.log(`  userId: ${account.userId ?? '(缺失)'}`)
  if (account.botToken === undefined) {
    console.log('  botToken: 缺失，跳过')
    continue
  }
  const response = await fetch('https://ilinkai.weixin.qq.com/ilink/bot/getupdates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationType: 'ilink_bot_token',
      'X-WECHAT-UIN': Buffer.from('1234', 'utf8').toString('base64'),
      Authorization: `Bearer ${account.botToken}`,
    },
    body: JSON.stringify({
      get_updates_buf: '',
      base_info: { channel_version: '0.0.0', bot_agent: 'companion-probe' },
    }),
  })
  const raw = await response.text()
  console.log(`  HTTP ${response.status}`)
  let parsed = {}
  try {
    parsed = JSON.parse(raw)
  } catch {
    /* 非 JSON */
  }
  const code = parsed.errcode ?? parsed.ret
  console.log(`  code: ${code ?? '(无)'} msg: ${parsed.errmsg ?? '(无)'}`)
  console.log(`  消息条数: ${Array.isArray(parsed.msgs) ? parsed.msgs.length : 0}`)
  if (code === -14) console.log('  → 登录态已失效，需要重新扫码')
  else if (code === 0 || code === undefined) console.log('  → 登录态有效')
  else console.log('  → 其他错误，见原始响应')
  console.log(`  原始响应: ${raw.slice(0, 200)}\n`)
}
