import { recordFeishuRoute } from './feishu-state.mjs'
import { createHmac } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

export function feishuConfig() {
  const path = join(process.env.DSH_HOME?.trim() || join(homedir(), '.dsh'), 'notifications', 'feishu.json')
  let config
  try {
    config = JSON.parse(readFileSync(path, 'utf8'))
  } catch (error) {
    if (error.code !== 'ENOENT') throw new Error('飞书通知配置无法读取或 JSON 无效')
    config = {}
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('飞书通知配置必须是 JSON 对象')
  if (config.enabled === false) return undefined
  if (config.mode === 'app' || config.appId || process.env.DSH_FEISHU_APP_ID) {
    const appId = config.appId || process.env.DSH_FEISHU_APP_ID
    const appSecret = config.appSecret || process.env.DSH_FEISHU_APP_SECRET
    const receiveId = config.receiveId || process.env.DSH_FEISHU_RECEIVE_ID
    const receiveIdType = config.receiveIdType || 'open_id'
    if (![appId, appSecret, receiveId].every((value) => typeof value === 'string' && value.trim())) {
      throw new Error('飞书私聊通知需要 appId、appSecret 和 receiveId')
    }
    if (!['open_id', 'user_id', 'union_id', 'email', 'chat_id'].includes(receiveIdType)) throw new Error('飞书 receiveIdType 无效')
    return { mode: 'app', appId, appSecret, receiveId, receiveIdType,
      ...(config.inbound === true ? { inbound: true, cwd: config.cwd } : {}) }
  }
  const webhook = config.webhook || process.env.DSH_FEISHU_WEBHOOK
  if (!webhook) return undefined
  let url
  try { url = new URL(webhook) } catch { throw new Error('飞书 Webhook 格式无效') }
  if (url.protocol !== 'https:' || !['open.feishu.cn', 'open.larksuite.com'].includes(url.hostname) || !url.pathname.startsWith('/open-apis/bot/v2/hook/')) {
    throw new Error('请使用飞书或 Lark 官方自定义机器人 Webhook')
  }
  return { webhook: url.href, secret: config.secret || process.env.DSH_FEISHU_SECRET || '' }
}

export function feishuBody(text, secret = '', timestamp = Math.floor(Date.now() / 1000)) {
  const body = { msg_type: 'text', content: { text: `【DSH】\n${text}` } }
  if (secret) {
    body.timestamp = String(timestamp)
    body.sign = createHmac('sha256', `${timestamp}\n${secret}`).update('').digest('base64')
  }
  return body
}

export async function sendFeishu(text, config = feishuConfig(), metadata = {}) {
  if (!config) throw new Error('尚未配置飞书通知')
  if (config.mode === 'app') {
    if (metadata.card) return sendAppMessage(text, config, metadata)
    const chars = Array.from(text)
    if (chars.length === 0) return sendAppMessage(text, config, metadata)
    for (let at = 0; at < chars.length; at += 8000) await sendAppMessage(chars.slice(at, at + 8000).join(''), config, metadata)
    return true
  }
  let response
  try {
    response = await fetch(config.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feishuBody(text, config.secret)),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    throw new Error('飞书通知连接失败或超时')
  }
  if (!response.ok) throw new Error(`飞书通知 HTTP ${response.status}`)
  let result
  try { result = await response.json() } catch { throw new Error('飞书通知返回了无效 JSON') }
  const code = result.code ?? result.StatusCode
  if (code !== 0) throw new Error(`飞书通知被拒绝，code=${String(code ?? 'missing')}；请检查机器人签名、关键词或 IP 限制`)
  return true
}

// Application tokens are refreshed by app credentials; no user chat keepalive is needed.
let tokenCache
async function appRequest(path, body, token) {
  let response
  try {
    response = await fetch(`https://open.feishu.cn/open-apis/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    throw new Error('飞书应用通知连接失败或超时')
  }
  if (!response.ok) throw new Error(`飞书应用通知 HTTP ${response.status}`)
  try { return await response.json() } catch { throw new Error('飞书应用通知返回了无效 JSON') }
}

export async function appToken(config) {
  if (tokenCache?.appId === config.appId && tokenCache?.appSecret === config.appSecret && tokenCache.expiresAt > Date.now()) return tokenCache.token
  const result = await appRequest('auth/v3/tenant_access_token/internal', { app_id: config.appId, app_secret: config.appSecret })
  if (result.code !== 0 || typeof result.tenant_access_token !== 'string' || !result.tenant_access_token) {
    throw new Error(`飞书应用鉴权失败，code=${String(result.code ?? 'missing')}；请检查 App ID 和 App Secret`)
  }
  const expires = Number(result.expire)
  tokenCache = {
    appId: config.appId,
    appSecret: config.appSecret,
    token: result.tenant_access_token,
    expiresAt: Date.now() + (Number.isFinite(expires) ? Math.max(0, expires - 60) * 1000 : 0),
  }
  return tokenCache.token
}

async function sendAppMessage(text, config, metadata) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const token = await appToken(config)
    const result = await appRequest(`im/v1/messages?receive_id_type=${encodeURIComponent(config.receiveIdType)}`, {
      receive_id: config.receiveId,
      msg_type: metadata?.card ? 'interactive' : 'text',
      content: JSON.stringify(metadata?.card || { text: `【DSH】\n${text}` }),
    }, token)
    if (result.code === 0) {
      try { recordFeishuRoute(result.data?.message_id, metadata?.sessionId) } catch { /* delivery already succeeded */ }
      return true
    }
    if (attempt === 0 && [99991661, 99991663, 99991668].includes(result.code)) {
      tokenCache = undefined
      continue
    }
    throw new Error(`飞书应用消息被拒绝，code=${String(result.code ?? 'missing')}；请检查发送消息权限、应用可用范围和接收人标识`)
  }
}

// 就地更新已发出的消息卡片（旧版 Card 1.0 交互卡点击后的标准做法）：
// card.action.trigger 回调用 ACK（HTTP 200）即可，PC 卡片的替换必须走这个独立接口。
// `token` 来自卡片回调事件里的 `token`（延迟更新令牌，30 分钟有效、最多用 2 次），
// 与上方鉴权用的 tenant_access_token 是两回事；Card 1.0 缺 open_ids 会返回 300090。
export async function updateCard(token, card, config = feishuConfig()) {
  if (!config || config.mode !== 'app') throw new Error('飞书应用未配置，无法更新卡片')
  if (!token) throw new Error('缺少卡片更新令牌（card.action.trigger 事件里的 token）')
  const body = { token, card }
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const appTok = await appToken(config)
    const result = await appRequest('interactive/v1/card/update', body, appTok)
    if (result.code === 0) return true
    // 令牌失效：清缓存重试一次。open_ids 缺失（300090）等结构性错误不重试。
    if (attempt === 0 && [99991661, 99991663, 99991668].includes(result.code)) {
      tokenCache = undefined
      continue
    }
    throw new Error(`飞书卡片更新失败，code=${String(result.code ?? 'missing')}`)
  }
  return true
}
