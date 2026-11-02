import { WSClient, EventDispatcher, LoggerLevel } from '@larksuiteoapi/node-sdk'
import { feishuConfig } from '../lib/feishu.mjs'
const config = feishuConfig()
if (config?.mode !== 'app') throw new Error('需要飞书应用配置')
let client
let done = false
function finish(ok, message) {
  if (done) return
  done = true
  console.log(message)
  process.exitCode = ok ? 0 : 1
  clearTimeout(deadline)
  setTimeout(() => client.close({ force: true }), 0)
}
const deadline = setTimeout(() => finish(false, '长连接握手未在 20 秒内完成，请检查飞书事件与回调的长连接设置。'), 20000)
client = new WSClient({
  appId: config.appId, appSecret: config.appSecret, autoReconnect: false, loggerLevel: LoggerLevel.error,
  logger: { error: (...args) => console.log(args.filter((arg) => typeof arg === 'string').join(' ').replace(/wss?:\/\/\S+/g, '[connection]').slice(0, 300)), warn() {}, info() {}, debug() {}, trace() {} },
  onReady: () => finish(true, '飞书长连接真实握手成功。'),
  onError: () => finish(false, '飞书长连接失败：请检查应用事件与回调中是否启用了长连接接收。'),
})
await client.start({ eventDispatcher: new EventDispatcher({}).register({ 'im.message.receive_v1': () => ({}), 'card.action.trigger': () => ({}) }) })
