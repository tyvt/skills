/**
 * 上游 hook：让 dsh-channel-wechat 把入站文本先交给 companion 认领。
 *
 * 这个文件被 `dsh-channel-wechat` 在启动通道时动态加载（见它 lib/index.js
 * 里的 `loadExternalSeam`）。它存在的唯一目的是解决一件事：微信的
 * `sendmessage` 必须带那条入站消息的 `context_token`，而这个 token 只在上游
 * 的轮询循环里拿得到。与其复制一份轮询去抢同一个游标（会把聊天消息抢走），
 * 不如让上游把这一条交过来。
 *
 * 契约很小，所以升级后即使这里坏了也不会拖垮上游：只有 `claim` 抛错会被
 * 上游吞掉并记一行日志，通道本身照常工作。
 *
 * @module dsh-channel-wechat-companion/upstream-hook
 */

import { rememberContext } from './context-store.mjs'

/** companion 在它自己的 apply 里挂上的处理函数。 */
let handler

/** 由 companion 注入真正实现。重复注入以最后一次为准。 */
export function install(fn) {
  handler = typeof fn === 'function' ? fn : undefined
}

/** 由 companion 在卸载时清掉，避免升级/重载后指向旧的闭包。 */
export function uninstall() {
  handler = undefined
}

/**
 * 上游调用：这条文本要不要被 companion 接管。
 *
 * 返回 true 表示已经消费（是一张卡片的回执），上游不再把它当作对话输入；
 * 返回 false 表示不是我们的，正常走对话。任何时候都不抛错。
 *
 * @param payload - 上游给的入站信息。
 * @returns 是否已被消费。
 */
export function claimInbound(payload) {
  try {
    rememberContext(payload ?? {})
  } catch {
    // Disk failure must never consume an inbound message.
  }
  if (payload?.observeOnly === true || handler === undefined) return false
  try {
    return handler(payload?.peerId, payload?.text, payload?.contextToken) === true
  } catch {
    return false
  }
}
