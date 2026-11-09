# Summary
2026-11-09，用户报告 zhi2-mobile-shimin H5 以 web-view 嵌入微信小程序时，分享小程序页面会携带 URL 上的 token，导致其他用户打开后直接使用该 token 自动登录，获取原用户登录态（会话固定/登录态劫持漏洞）。
# 2026-11-09 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 当前H5会做为web-view嵌入其他微信小程序，当用户分享小程序页面的，会携带url上的token，导致其他用户打开后直接使用了携带的token登录，获取了其他用户的登录状态

<!-- MEMORY_FIELDS
{
  "event_name": "token会话固定漏洞报告",
  "goal": "报告安全漏洞",
  "summary": "2026-11-09，用户报告 zhi2-mobile-shimin H5 以 web-view 嵌入微信小程序时，分享小程序页面会携带 URL 上的 token，导致其他用户打开后直接使用该 token 自动登录，获取原用户登录态（会话固定/登录态劫持漏洞）。",
  "ranges": "0",
  "source_extraction_id": "4a45c2f9a945485dbc39ad0e7769ff2d",
  "version": 1,
  "memory_type": "events"
}
-->