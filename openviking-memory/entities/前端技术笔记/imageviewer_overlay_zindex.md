# ImageViewer 预览被附件抽屉遮挡修复
园区公共收益项目公共设施设备维护详情等页面，从"附件信息"抽屉打开的图片预览被抽屉盖住的根因与修复。

## 根因
- 图片预览用全局 ImageViewer 组件（src/components/ImageViewer/index.vue，由 App.vue 挂载、store 的 preview/openPreview 驱动），底层为 el-dialog，z-index 由 Element 的 PopupManager 从 2000 起自动分配
- "附件信息"抽屉（src/components/OperationBtnGroup/attachmentDraw.vue）CSS 写死 .attachment { z-index: 3000 !important } 且不走 PopupManager
- 预览弹窗和遮罩永远被压在抽屉下面，右侧 480px 宽抽屉盖住预览图，全局复现

## 修复要点
- 只改 src/components/ImageViewer/index.vue
- 新增 raiseAboveOverlay()：预览打开后 nextTick 把弹窗 wrapper 的 z-index 设为 3002、遮罩 .custom-image-viewer-mask 设为 3001
- 每次打开都重新设置，保证层级高于抽屉

## 涉及文件
- src/components/ImageViewer/index.vue
- src/components/OperationBtnGroup/attachmentDraw.vue
- App.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=园区公共收益
- 所属项目：园区公共收益；来源会话ID：3c99fd44-d5db-4c60-9901-585c3fe1f2e3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "imageviewer_overlay_zindex",
  "source_extraction_id": "e0e87242c8254357a011c8930e518a2e",
  "version": 1,
  "memory_type": "entities"
}
-->