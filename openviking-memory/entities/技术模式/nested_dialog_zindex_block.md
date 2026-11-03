# 内层弹窗z-index低于父遮罩致点击失效
Element 的 PopupManager 给嵌套父 zs-dialog 的内层 .el-dialog__wrapper 及 .v-modal 分配 z-index 不高于父级遮罩，事件被父级全屏遮罩拦截。

## 问题根因
- 嵌套父 zs-dialog 内层 .el-dialog__wrapper 与 .v-modal 的 z-index 不高于父级遮罩
- 父级全屏遮罩拦截点击事件，内层弹窗无法交互

## 解决方案
- 仅抬升 el-select-dropdown 的 z-index 无法抬高弹窗本身
- 需给内层 zs-dialog 提升层级，或用 ref 控制显隐与层级

## 验证与归属
- 验证证据：src=2-0/013.md
- 涉及文件：@zhi2-web-admin/src/views/solicitation/components/maintenanceFeeDtlDialog.vue
- 来源会话ID：f7fa3bf8-e11d-41c2-ab82-7f380cbd83c7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "nested_dialog_zindex_block",
  "source_extraction_id": "e92e113b6217448e810aa27c305e1d32",
  "version": 1,
  "memory_type": "entities"
}
-->