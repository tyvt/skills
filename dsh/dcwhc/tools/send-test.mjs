/**
 * 直接调用微信 API 发一条测试消息，验证凭证是否真的可用。
 *
 * 走的是 companion 内部同一套 sendmessage 协议，所以这一步通了，说明"登录
 * 有效 + 协议正确"；不通就是登录或网络问题，与插件加载无关。这样能把
 * "插件没加载" 和 "登录无效" 两件事分开，不再互相掩盖。
 */

import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')
const credentialsPath = join(home, '.credentials.yaml')

/** 从 credentials.yaml 里取第一条 channel-wechat 记录的 botToken 与 userId。 */
function readAccount() {
  const text = readFileSync(credentialsPath, 'utf8')
  const lines = text.split(/\r?\n/)
  let inWechat = false
  let botToken
  let userId
  for (const line of lines) {
    if (/^\s*channel-wechat\//.test(line)) {
      inWechat = true
      continue
    }
    if (/^\s*\S/.test(line) && !/^\s/.test(line) && !/^\s*channel-wechat\//.test(line)) {
      if (inWechat && botToken !== undefined) break
      inWechat = false
    }
    if (!inWechat) continue
    const token = /^\s*botToken:\s*(.+)$/.exec(line)
    if (token !== null && botToken === undefined) botToken = token[1].trim().replace(/^["']|["']$/g, '')
    const user = /^\s*userId:\s*(.+)$/.exec(line)
    if (user !== null && userId === undefined) userId = user[1].trim().replace(/^["']|["']$/g, '')
  }
  return { botToken, userId }
}

const { botToken, userId } = readAccount()
if (botToken === undefined || userId === undefined) {
  console.error('凭证文件里没找到完整的 channel-wechat 记录。')
  process.exit(1)
}

console.log('目标微信 id:', userId)
console.log('token 长度:', botToken.length, '（不打印内容）')

const stamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
const text = [
  '【连通性自测】',
  `时间：${stamp}`,
  '',
  '如果你看到这条，说明微信登录有效、发送协议正确。',
  '来源：channel-wechat-companion 直连测试',
].join('\n')

const response = await fetch('https://ilinkai.weixin.qq.com/ilink/bot/sendmessage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    AuthorizationType: 'ilink_bot_token',
    'X-WECHAT-UIN': Buffer.from(String(Math.floor(Math.random() * 4294967296)), 'utf8').toString('base64'),
    Authorization: `Bearer ${botToken}`,
  },
  body: JSON.stringify({
    msg: {
      from_user_id: '',
      to_user_id: userId,
      client_id: [...crypto.getRandomValues(new Uint8Array(16))]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join(''),
      message_type: 2,
      message_state: 2,
      item_list: [{ type: 1, text_item: { text } }],
    },
    base_info: { channel_version: '0.0.0', bot_agent: 'dsh-channel-wechat-companion' },
  }),
})

const raw = await response.text()
console.log('HTTP:', response.status)
console.log('响应:', raw.slice(0, 400))

let parsed = {}
try {
  parsed = JSON.parse(raw)
} catch {
  /* 非 JSON 响应 */
}
const code = parsed.errcode ?? parsed.ret
if (response.ok && (code === undefined || code === 0)) {
  console.log('\n✓ 发送成功，去看手机微信')
  process.exit(0)
}
console.log('\n✗ 发送失败，code =', code)
process.exit(1)
