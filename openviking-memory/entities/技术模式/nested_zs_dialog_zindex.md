# 嵌套zs-dialog内层弹窗z-index提升修复
产品2.0 中「维修项」弹窗嵌在「编辑维修项」父 zs-dialog 里，内层弹窗可点区域（含下拉三角）点不动，因父级遮罩吃掉事件。

## 问题根因
- Element 的 PopupManager 给内层 `.el-dialog__wrapper` / 配套 `.v-modal` 的 z-index 仍不高于父级遮罩，事件被父级全屏遮罩吃掉
- 仅加 `el-select-dropdown` 的 z-index 无法抬高内层弹窗本身，对「打不开」无帮助

## 解决方案
- 给内层 `zs-dialog` 加 `ref="feeDtlZsDialog"`，在 `@opened="raiseNestedDialogStack"` 里用 `!important` 强制：
  - 内层 `.el-dialog__wrapper` → `z-index: 5000`
  - 其相邻 `.v-modal`（前/后兄弟都判断）→ `5000 - 1`
  - 在 `$nextTick` + `setTimeout(0)` 各执行一次，避免被 Element 随后写回的 inline 样式覆盖
- 下拉面板仍用 `popper-cl`（原文截断，保留原有 popper 方案）

## 验证与归属
- 涉及文件：@zhi2-web-admin/src/views/solicitation/components/maintenanceFeeDtlDialog.vue
- 所属项目：2-0；来源会话：f7fa3bf8-e11d-41c2-ab82-7f380cbd83c7；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "nested_zs_dialog_zindex",
  "source_extraction_id": "2aa332ea5aa44f9da068c10bd4812892",
  "version": 1,
  "memory_type": "entities"
}
-->