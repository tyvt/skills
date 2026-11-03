# 门户跳转显式携带小区参数
wygl小程序跳转门户H5前须显式对齐并携带当前小区选中参数，避免维修资金等入口丢失上下文。

## 实现方式
- 跳转前通过 preparePortalNavigateContext() 对齐 syncPortalHouseSelection 与 picker，并解析 complexId/houseId 写入快照
- openWebViewForMiniRoute 扩展 portalContext 参数，显式携带至 portalH5Webview 的 buildPortalH5FlatQuery
- 维修资金等入口依此带参打开 H5，确保门户侧拿到正确的小区/房屋上下文

## 验证与归属
- 验证证据：extracted source=cursor session=2b96f5ea-125e-4e83-a90a-a1b32b6482be
- 涉及文件：pages/webview/home.vue、utils/portal-h5-webview.js、utils/portal-user.js、pages/webview/portalH5Webview.vue、pages/webview/externalWebview.vue
- 所属项目：小程序（wygl-wxxcx-dev-slh）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_nav_params",
  "source_extraction_id": "be4aa91f02c141399d6ebae445df4642",
  "version": 1,
  "memory_type": "entities"
}
-->