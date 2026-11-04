# 弹窗中表格区域因缺少弹性高度而收缩
未定义高度的弹性父容器导致 flex:1 的表格区域收缩至约 120px，仅显示 2-3 行。

## 描述
- 弹性父容器没有显式高度。
- 具有 flex:1 的表格区域收缩至约 120px 的最小高度。
- 弹窗中仅可见 2-3 行。

## 解决方案
- 将 dialog-box 的高度定义为 var(--zs-dialog-content-max-height) (~88vh)。
- 从 el-dialog 到表格的弹性高度链已连接。
- ResizeObserver 同步表格高度，避免 zs-table 固定高度的重叠。

## 文件
- zhi2-web-admin/src/views/maintenance/components/OpeningBuildingDialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/views/maintenance/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OpenDetailTable.vue
- zhi2-web-admin/src/views/maintenance/depositNotice/components/ScopeSelectDialog.vue

## 关系
- 会话来源: 082a4d1c-6379-4946-a74a-7dab35a3ffd7 (cursor)
- 所属项目: produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flex_no_height_table",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->