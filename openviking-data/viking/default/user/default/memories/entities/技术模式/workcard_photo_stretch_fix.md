# 工作牌下载证件照拉伸修复
苏州市房地产监测V3 修复工作牌/信息卡下载时证件照与 Logo 被拉伸的问题，改用 object-fit 重绘。

## 修改内容
- 新增 `html2canvasObjectFit.js`：在 `html2canvas` 的 `onclone` 阶段按 `object-fit: cover`/`contain` 将图片重绘到 canvas
- 使用克隆文档的 `getComputedStyle`，兼容 `getBoundingClientRect` 作为尺寸回退
- `WorkCardDialog.vue`：`handleDownload` 在 `onclone` 中处理 `.work-card__photo` 与 `.work-card__logo`
- `InfoCardDialog.vue`：`handleDownload` 在 `onclone` 中处理对应图片

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`html2canvasObjectFit.js`、`WorkCardDialog.vue`、`InfoCardDialog.vue`
- 来源会话ID：0b2661f5-bbe8-434f-86da-96244d6397a7
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workcard_photo_stretch_fix",
  "source_extraction_id": "7363ffb17ce0413da919427f6f448e60",
  "version": 1,
  "memory_type": "entities"
}
-->