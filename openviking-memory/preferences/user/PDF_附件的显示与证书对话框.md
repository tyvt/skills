---
audit_status: valid
last_checked: 2026-11-27T16:27:00+08:00
verdict_note: 用户显示偏好（PDF缩略图-证书对话框），非代码事实，为行为约定，无违规。
---

- 优先使用 `detailAttachmentDisplay.js` 处理原始图像和带有固定图片 `/assets/images/file/1.png` 的 PDF。
- 在 `detail-template.vue` 中，PDF 以 100×100 缩略图显示，并在新窗口打开。
- 证书对话框不固定为 `92vh`，随内容增长，超出时设置 `max-height` 并出现滚动条。


<!-- MEMORY_FIELDS
{
  "version": 1
}
-->