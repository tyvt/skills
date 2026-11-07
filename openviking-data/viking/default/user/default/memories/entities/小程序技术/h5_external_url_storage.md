# 外链H5长URL用storage中转再开web-view
灵犀投票等外链 query 很长，直接 navigateTo?url= 易超长或编码丢失，改用 storage 中转。

## 中转约定
- 跳转前 uni.setStorageSync(H5_EXTERNAL_URL_STORAGE_KEY, fullUrl)，页面参数带 from=storage
- h5ExternalWebview/externalWebview 的 onLoad 在 from===storage 时读 storage、赋给 webViewSrc 后 立即 removeStorageSync，否则下次误用旧链
- 其余情况走 resolveExternalWebViewUrlFromQuery / buildExternalWebViewSrc 统一拼 src
- 小程序侧仍需配置业务域名（如 wxzj.wxwgzx.com），与 storage 中转无关

## 验证与归属
- 验证证据：会话 20f0fb9d 对 h5ExternalWebview 引入 H5_EXTERNAL_URL_STORAGE_KEY、from=storage、resolveExternalWebViewUrlFromQuery、buildExternalWebViewSrc
- 涉及文件：pages/portal/h5ExternalWebview.vue、utils/portal-h5-webview.js
- 所属项目：小程序；来源会话ID：20f0fb9d-f129-47b3-bf27-cc7eb42adc16；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_external_url_storage",
  "source_extraction_id": "3009dd90074b496cb5ed0d2113ea792c",
  "version": 1,
  "memory_type": "entities"
}
-->