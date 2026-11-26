# Summary
新建 utils/portal-h5-webview.js 集中维护与原 externalWebview 一致的逻辑：getPortalH5WebViewBaseUrl（按小程序环境/NODE_ENV 选 H5 根地址）、buildWebViewUrlWithHashRoute（拼 # 后路由与 query）、buildPortalH5FlatQuery（对齐原 getWebViewMergedParamMap，读 portal-user 的 token 与快照，去掉 miniRoute/openMiniRoute）、buildPortalH5WebViewSrc（得到最终 web-view 的 src）、getPortalH5WebviewNavigateUrl（供其它页拼跳转地址）；并新建 pages/webview/portalH5Webview.vue 全屏承载 web-view（src 为 webViewSrc），onLoad 读取 miniRoute（兼容 openMiniRoute）。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】fact
【标题】当前页面的登录逻辑应该和@pages/webview
【内容】### 1. 新建 `utils/portal-h5-webview.js` 集中维护与原先 `externalWebview` 一致的逻辑： - `getPortalH5WebViewBaseUrl()`：按小程序环境 / `NODE_ENV` 选 H5 根地址 - `buildWebViewUrlWithHashRoute`：拼 `#` 后路由与 query - `buildPortalH5FlatQuery(pageLoadOptions)`：对齐原 `getWebViewMergedParamMap`（读 `portal-user` 的 token + 快照，去掉 `miniRoute` / `openMiniRoute`） - `buildPortalH5WebViewSrc(miniRouteWithQuery, pageLoadOptions)`：得到最终 `web-view` 的 `src` - `getPortalH5WebviewNavigateUrl(...)`：可选，供其它页拼跳转地址 ### 2. 新建 `pages/webview/portalH5Webview.vue` - 全屏承载 **`<web-view :src="webViewSrc">`** - `onLoad` 读取 **`miniRoute`**（兼容 **`openMiniRoute`
【验证证据】extracted source=cursor project=小程序
【涉及文件】`utils/portal-h5-webview.js ; `pages/webview/portalH5Webview.vue ; **`pages.js ; `pages/webview/externalWebview.vue
【所属项目】小程序
【来源会话ID】5c68c6ac-0836-4b0f-83d0-9a13e307e434
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "门户Webview页面与工具新建",
  "goal": "新建门户Webview页面",
  "summary": "新建 utils/portal-h5-webview.js 集中维护与原 externalWebview 一致的逻辑：getPortalH5WebViewBaseUrl（按小程序环境/NODE_ENV 选 H5 根地址）、buildWebViewUrlWithHashRoute（拼 # 后路由与 query）、buildPortalH5FlatQuery（对齐原 getWebViewMergedParamMap，读 portal-user 的 token 与快照，去掉 miniRoute/openMiniRoute）、buildPortalH5WebViewSrc（得到最终 web-view 的 src）、getPortalH5WebviewNavigateUrl（供其它页拼跳转地址）；并新建 pages/webview/portalH5Webview.vue 全屏承载 web-view（src 为 webViewSrc），onLoad 读取 miniRoute（兼容 openMiniRoute）。",
  "ranges": "11-14",
  "source_extraction_id": "438816052566427c9ffde4cf311de2c3",
  "version": 1,
  "memory_type": "events"
}
-->