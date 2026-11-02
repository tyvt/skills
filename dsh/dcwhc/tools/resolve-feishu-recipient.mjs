import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { sendFeishu } from '../lib/feishu.mjs'
const path = join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'notifications', 'feishu.json')
const config = JSON.parse(readFileSync(path, 'utf8'))
const mobile = process.argv[2]
if (!/^\+?\d{6,16}$/.test(mobile || '')) throw new Error('请传入有效的飞书登录手机号')
const auth = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ app_id: config.appId, app_secret: config.appSecret }), signal: AbortSignal.timeout(15000),
}).then((r) => r.json())
if (auth.code !== 0) throw new Error(`应用鉴权失败：${auth.code}`)
const result = await fetch('https://open.feishu.cn/open-apis/contact/v3/users/batch_get_id?user_id_type=open_id', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.tenant_access_token}` },
  body: JSON.stringify({ mobiles: [mobile], include_resigned: false }), signal: AbortSignal.timeout(15000),
}).then((r) => r.json())
if (result.code !== 0) {
  console.log(JSON.stringify({ stage: 'recipient', code: result.code, msg: result.msg }))
  process.exit(1)
}
const matches = (result.data?.user_list || []).filter((user) => user.user_id)
if (matches.length !== 1) throw new Error('没有找到唯一接收人，请检查手机号及应用通讯录可见范围')
config.receiveId = matches[0].user_id
config.receiveIdType = 'open_id'
// Verify delivery before switching the notification routing.
await sendFeishu('【通知接入测试】飞书私聊发送成功。后续对话完成、出错和需要确认时会在这里提醒，无需发消息保活。', { ...config, mode: 'app' })
config.enabled = true
writeFileSync(path, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 })
console.log('已解析唯一接收人、成功发送测试私聊，并启用飞书通知配置（不输出手机号、密钥或 access token）。')
