# 附件抽屉写死z-index致全局图片预览被遮挡
园区公共收益项目(zhi2-web-admin)中附件抽屉写死 z-index 致全局 ImageViewer 图片预览被遮挡，已通过新增 raiseAboveOverlay 修复。

## 问题根因
- 全局 `ImageViewer`（`src/components/ImageViewer/index.vue`）基于 `el-dialog` 由 PopupManager 分配 z-index
- `src/components/OperationBtnGroup/attachmentDraw.vue` 写死 `.attachment { z-index: 3000 !important }` 使其受遮挡

## 解决方案
- 在 `ImageViewer` 新增 `raiseAboveOverlay()`，于 `nextTick` 将弹窗 wrapper 与遮罩 `.custom-image-viewer-mask` 的 z-index 分别设为 3002 与 3001

## 涉及文件
- D:/repository/园区公共收益/zhi2-web-admin/src/components/OperationBtnGroup/attachmentDraw.vue
- D:/repository/园区公共收益/zhi2-web-admin/src/components/AnnexUpload/index.vue
- D:/repository/园区公共收益/zhi2-web-admin/src/components/AnnexUpload/components/ImageGrid.vue
- D:/repository/园区公共收益/zhi2-web-admin/src/store/modules/preview.js
- D:/repository/园区公共收益/zhi2-web-admin/src/components/ImageViewer/index.vue

## 验证与归属
- 验证证据：src=园区公共收益/037.md
- 来源会话ID：3c99fd44-d5db-4c60-9901-585c3fe1f2e3；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attachment_drawer_zindex",
  "source_extraction_id": "cc74d45141114b05b84f349e26a4345c",
  "version": 1,
  "memory_type": "entities"
}
-->