# maintenanceApplyTable operationColumnWidth 声明冲突修复
园区物管2.0（zhi2-web-admin）中 `maintenanceApplyTable.vue` 因 `data` 与 `computed` 同名 `operationColumnWidth` 触发 Vue warn。

## 问题原因
- `subTableMixins` → `table.js` 已在 `data` 声明 `operationColumnWidth: 80`（供列表页操作列宽度）
- 本组件又在 `computed` 定义同名 `operationColumnWidth`
- Vue 2 不允许同属性既在 `data` 又在 `computed`，故报警告

## 修复方案
- 计算属性改名为 `applyOperateColumnWidth`
- 模板 `:width` 改为绑定 `applyOperateColumnWidth`
- 逻辑不变：`bizState === '0'` 时 160，否则 100
- 刷新页面后警告应消失

## 涉及文件
- zhi2-web-admin/src/views/maintenance/maintenanceProject/components/maintenanceApplyTable.vue
- zhi2-web-admin/src/mixins/table.js

## 验证与归属
- 所属项目：园区物管2.0（2-0）；来源会话：751fbf61-9cad-490e-9eb7-c4aa5a8ffe55；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "maintenanceapplytable_columnwidth",
  "source_extraction_id": "f8b4f9aed74b471bb17b7829c522f1b4",
  "version": 1,
  "memory_type": "entities"
}
-->