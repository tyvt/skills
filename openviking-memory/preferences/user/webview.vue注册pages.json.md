- webView.vue 为小程序原生页承载 <web-view> 加载 H5，须在 zhi2-mobile-admin-h5-c-unlimited/src/pages.json 注册；小程序嵌入 H5 时必须注册该页，若已有容器页则合并 @message 逻辑，仅复制 filePreview.vue 可不注册。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "webView.vue注册pages.json",
  "source_extraction_id": "33d3bb10c5974475b872c4caf7399a25",
  "version": 1,
  "memory_type": "preferences"
}
-->