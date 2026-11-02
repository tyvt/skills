import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
const home = process.env.DSH_HOME || join(homedir(), '.dsh')
const config = JSON.parse(readFileSync(join(home, 'notifications', 'feishu.json'), 'utf8'))
const auth = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ app_id: config.appId, app_secret: config.appSecret }), signal: AbortSignal.timeout(15000),
}).then((response) => response.json())
if (auth.code !== 0 || !auth.tenant_access_token) {
  console.log(JSON.stringify({ stage: 'auth', code: auth.code, msg: auth.msg }))
  process.exit(1)
}
console.log('应用鉴权成功（不输出 access token）')
for (const path of [`application/v6/applications/${config.appId}?lang=zh_cn`, 'contact/v3/scopes?user_id_type=open_id']) {
  const result = await fetch(`https://open.feishu.cn/open-apis/${path}`, {
    headers: { Authorization: `Bearer ${auth.tenant_access_token}` }, signal: AbortSignal.timeout(15000),
  }).then((response) => response.json())
  const app = result.data?.app || result.data?.application || result.data || {}
  console.log(JSON.stringify({
    path, code: result.code, msg: result.msg,
    keys: Object.keys(app),
    owner: app.owner, owner_id: app.owner_id, creator: app.creator, creator_id: app.creator_id,
    user_ids: result.data?.user_ids, department_ids: result.data?.department_ids,
  }))
}
