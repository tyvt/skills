import { readFile, stat } from 'node:fs/promises'
import { basename } from 'node:path'
import { appToken } from './feishu.mjs'
import { recordFeishuRoute } from './feishu-state.mjs'

export async function sendFeishuFile(path, config, sessionId) {
  const info = await stat(path)
  if (!info.isFile()) throw new Error('交付物不是普通文件。')
  if (info.size > 50 * 1024 * 1024) throw new Error('交付物超过飞书通道 50MB 限制。')
  const data = await readFile(path)
  const token = await appToken(config)
  const form = new FormData()
  form.set('file_type', 'stream')
  form.set('file_name', basename(path))
  form.set('file', new Blob([data]), basename(path))
  const response = await fetch('https://open.feishu.cn/open-apis/im/v1/files', {
    method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form, signal: AbortSignal.timeout(60000),
  })
  const upload = await response.json().catch(() => ({}))
  if (!response.ok || upload.code !== 0 || !upload.data?.file_key) throw new Error(`飞书文件上传失败 HTTP ${response.status}，code=${upload.code ?? 'missing'}：${String(upload.msg || '请检查消息资源权限及文件参数。').slice(0, 1500)}`)
  const sent = await fetch(`https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${encodeURIComponent(config.receiveIdType)}`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ receive_id: config.receiveId, msg_type: 'file', content: JSON.stringify({ file_key: upload.data.file_key }) }),
    signal: AbortSignal.timeout(15000),
  })
  if (!sent.ok) throw new Error(`飞书文件发送失败 HTTP ${sent.status}`)
  const result = await sent.json()
  if (result.code !== 0) throw new Error(`飞书文件发送被拒绝，code=${result.code}`)
  try { recordFeishuRoute(result.data?.message_id, sessionId) } catch { /* file delivery already succeeded */ }
  return true
}
