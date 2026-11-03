# html2canvas导出图片object-fit重绘
html2canvas 默认不识别 object-fit 导致导出图片拉伸，需新增工具在 onclone 阶段重绘。

## 根因
- `html2canvas` 默认不识别 `object-fit`，导致导出图片（如证件照）被拉伸变形。

## 解决方案
- 新增 `zhi2-web-admin/src/utils/html2canvasObjectFit.js`，在 `onclone` 阶段按 `object-fit: cover/contain` 重绘图片。
- `WorkCardDialog.vue` 与 `InfoCardDialog.vue` 的 `handleDownload` 在 `onclone` 中处理 `.work-card__photo` 等节点。

## 涉及文件
- `WorkCardDialog.vue`、`AgencyPersonnelList.vue`、`InfoCardDialog.vue`（位于 institution/agencyPersonnel/components）
- `agency-personnel-real-api-flow.spec.js`、`resolveServerAssetUrl.js`、`html2canvasObjectFit.js`、`package.json`

## 验证
- 证据：src=苏州市房地产监测V3/220.md；会话 0b2661f5-bbe8-434f-86da-96244d6397a7；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "html2canvas_object_fit_redraw",
  "source_extraction_id": "d743391f84c8405d8d72212526994dae",
  "version": 1,
  "memory_type": "entities"
}
-->