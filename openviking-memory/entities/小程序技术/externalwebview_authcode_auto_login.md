# externalWebview 解析 redirectUrl 含 authCode 时自动跑登录绑房链
externalWebview 的 onLoad 解析 redirectUrl 得到含 authCode 的 query 时，会在 initializePage 内自动执行一次完整登录绑房链路并防重复触发。

## 触发条件
- 存在 redirectUrl 且解析结果包含 authCode（值为字符串 "0" 也算存在）
- 专用于外部 redirect 带授权码进站，与用户手动点登录不同

## 执行链路
- wx.login
- 调 wechat/login 拿页面级 pageToken
- 调 profile 取 userId/phone/realName/certificateNumber
- 调 selectMyHouseByLingXi（灵犀绑房）
- 将 token、complexId、houseId 拼入 web-view URL 并展示

## 防重复
- 维护 autoLoginTriggered（或等价标志）防止 onShow 或重复初始化再次触发自动登录

## 验证与归属
- 验证证据：「redirectUrl + 解析出 authCode 就自动跑完整链路」「authCode（即使为 0 也算）」「wx.login → wechat/login → profile → selectMyHouseByLingXi → token/complexId/houseId」「加了 autoLoginTriggered 防止 onShow 或重复初始化再次触发」
- 涉及文件：pages/webview/externalWebview.vue
- 所属项目：小程序；来源会话ID：0931abc6-673c-4efb-91bc-d74159322efb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "externalwebview_authcode_auto_login",
  "source_extraction_id": "f6fe17b59d124d2a9018edb7331037df",
  "version": 1,
  "memory_type": "entities"
}
-->