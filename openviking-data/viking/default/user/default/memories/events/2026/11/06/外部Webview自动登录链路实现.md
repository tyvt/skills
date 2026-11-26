# Summary
pages/webview/externalWebview.vue 改为按 redirectUrl 与 authCode 自动跑完整登录链路：页面初始化 onLoad 先解析 redirectUrl 得到 queryParams；当路由参数包含 redirectUrl 且 queryParams 包含 authCode（即使为 0 也算）时，在 initializePage 中自动触发一次链路：wx.login 调 wechat/login 拿 pageToken，调 profile 拿 userId/phone/realName/certificateNumber，再调 selectMyHouseByLingXi，最后拼 token/complexId/houseId 到 web-view URL 并展示；同时新增 autoLoginTriggered 防止 onShow 或重复初始化再次触发。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】preference
【标题】按照设计图@pages/webview/extern
【内容】已按你说的“**redirectUrl + 解析出 authCode 就自动跑完整链路**（有顺序）”改好了。 现在 `pages/webview/externalWebview.vue` 的行为是： - **页面初始化 onLoad** 会先解析 `redirectUrl` 得到 `queryParams` - 如果满足： - 路由参数里 **有** `redirectUrl` - 且解析后的 `queryParams` **包含** `authCode`（即使为 `0` 也算） - 则在 `initializePage` 里会自动触发一次（防重复）： - `wx.login` → 调 `wechat/login` 拿 `pageToken` - 调 `profile` 拿 `userId/phone/realName/certificateNumber` - 再调 `selectMyHouseByLingXi` - 最后拼 `token/complexId/houseId` 到 `web-view` URL 并展示 同时加了 `autoLoginTriggered` 防止 `onShow` 或重复初始化再次触发自动登录链路。
【验证证据】extracted source=cursor project=小程序
【涉及文件】`pages/webview/externalWebview.vue ; 涉及文件：d:\repository\小程序\wygl-wxxcx-dev-slh\pages\webview\externalWebview.vue、d:\repository\小程序\wygl-wxxcx-dev-slh\pages\home\index\index.vue、d:\repository\小程序\wygl-wxxcx-dev-slh\pages\home\login\index.vue、d:\repository\小程序\wygl-wxxcx-dev-slh\pages\face\verify.vue
【所属项目】小程序
【来源会话ID】0931abc6-673c-4efb-91bc-d74159322efb
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "外部Webview自动登录链路实现",
  "goal": "实现自动登录链路",
  "summary": "pages/webview/externalWebview.vue 改为按 redirectUrl 与 authCode 自动跑完整登录链路：页面初始化 onLoad 先解析 redirectUrl 得到 queryParams；当路由参数包含 redirectUrl 且 queryParams 包含 authCode（即使为 0 也算）时，在 initializePage 中自动触发一次链路：wx.login 调 wechat/login 拿 pageToken，调 profile 拿 userId/phone/realName/certificateNumber，再调 selectMyHouseByLingXi，最后拼 token/complexId/houseId 到 web-view URL 并展示；同时新增 autoLoginTriggered 防止 onShow 或重复初始化再次触发。",
  "ranges": "0-5",
  "source_extraction_id": "438816052566427c9ffde4cf311de2c3",
  "version": 1,
  "memory_type": "events"
}
-->