- 偏好附件按类型显示缩略图：图片使用原图，PDF 及其他类型使用固定图片 `/assets/images/file/1.png`。
- 在 `detail-template.vue` 中，PDF 不显示链接，而是显示 100x100 的缩略图，点击后在新窗口打开。
- 新增 `detailAttachmentDisplay.js` 以集中处理该行为。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 显示附件缩略图",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "preferences"
}
-->
