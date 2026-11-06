# portal-h5-webview 工具与壳页
新建 utils/portal-h5-webview.js 与原 externalWebview 逻辑对齐，并新增 pages/webview/portalH5Webview.vue 全屏承载 web-view。

## utils/portal-h5-webview.js
- getPortalH5WebViewBaseUrl()：按小程序环境 / NODE_ENV 选 H5 根地址
- buildWebViewUrlWithHashRoute：拼 # 后路由与 query
- buildPortalH5FlatQuery(pageLoadOptions)：对齐原 getWebViewMergedParamMap（读 portal-user 的 token + 快照，去掉 miniRoute / openMiniRoute）
- buildPortalH5WebViewSrc(miniRouteWithQuery, pageLoadOptions)：得到最终 web-view 的 src
- getPortalH5WebviewNavigateUrl(...)：可选，供其它页拼跳转地址

## pages/webview/portalH5Webview.vue
- 全屏承载 <web-view :src="webViewSrc">
- onLoad 读取 miniRoute（兼容 openMiniRoute）

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：utils/portal-h5-webview.js、pages/webview/portalH5Webview.vue、pages.js、pages/webview/externalWebview.vue
- 所属项目：小程序；来源会话ID：5c68c6ac-0836-4b0f-83d0-9a13e307e434；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_h5_webview",
  "source_extraction_id": "1571c5bfb625441c962d9eab86b058e3",
  "version": 1,
  "memory_type": "entities"
}
-->