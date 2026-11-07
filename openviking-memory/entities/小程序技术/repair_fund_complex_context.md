# 切换小区后维修资金参数一致性
wygl小程序切换小区后点击「维修资金」会带上与当前选中小区一致的参数。

## 实现说明
- 新增 `preparePortalNavigateContext()`：跳转前调用 `syncPortalHouseSelection` 与 picker 选中项对齐，从当前选中房屋解析 `complexId`/`houseId`，写入本地门户快照
- 扩展 `openWebViewForMiniRoute` 支持第二参数 `portalContext`，跳转 URL 显式带 `complexId`、`houseId`，由 `portalH5Webview`→`buildPortalH5FlatQuery` 优先使用（高于快照回退）
- 维修资金入口：点击先取当前小区上下文，无 `complexId` 提示「缺少小区信息」；有则带当前小区 `complexId`、`houseId` 打开 H5
- 小区信息入口同样改走 `preparePortalNavigateContext()`，与维修资金行为一致

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 跳转 URL 示例：`/pages/webview/portalH5Webview?miniRoute=%2Fpages_owner%2Fmaintain%2Findex&complexId=x`
- 涉及文件：pages/webview/home.vue、utils/portal-h5-webview.js、utils/portal-user.js
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：2b96f5ea-125e-4e83-a90a-a1b32b6482be；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "repair_fund_complex_context",
  "source_extraction_id": "319ceeb1dbb643c898b8a5bab118bd5f",
  "version": 1,
  "memory_type": "entities"
}
-->