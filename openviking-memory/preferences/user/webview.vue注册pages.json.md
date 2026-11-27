---
audit_status: valid
last_checked: 2026-11-27T03:53:06+08:00
verdict_note: 实机核对：无锡市区小程序嵌入H5 pages.json(121-124) 注册 pages/common/webView 且 navigationStyle-custom；webView 页注册约定属实。
---
- webView.vue 为小程序原生页承载 <web-view> 加载 H5，已在 zhi2-mobile-admin-h5-c-unlimited/src/pages.json 注册（路径 pages/common/webView，navigationStyle: custom）；小程序嵌入 H5 时仍须注册该页，若已有容器页则合并 @message 逻辑，仅复制 filePreview.vue 可不注册。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "webView.vue注册pages.json",
  "source_extraction_id": "8aea2040c35a436fbdbb96856e9b42ea",
  "version": 2,
  "memory_type": "preferences"
}
-->