# 表格多选列未配row-key致ElTable警告
苏州市房地产监测V3 中 ServiceSchemePanel.vue 的 zs-table 使用 zs-select-column 未配置 row-key 触发 Vue 警告，已通过增 _rowKey 修复。

## 问题根因
- `ServiceSchemePanel.vue` 的 `zs-table` 使用 `zs-select-column` 未配置 `row-key`
- `innerList` 更新触发 ElTable `data` watcher 致 Vue 警告

## 修复方案
- 表格增 `row-key="_rowKey"` 并为行生成唯一 `_rowKey`
- `emitChange` 剥离该键，批量删除改按 `_rowKey` 过滤
- 参照 `EducationTable.vue` 实现

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/311.md
- 涉及文件：ServiceSchemePanel.vue、zs-table.vue、EducationTable.vue、AgencyBranchDetail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：25e4469c-7d8e-407b-89ca-9f7744f1f475；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_row_key_warning",
  "source_extraction_id": "2080a0baaff942c089970729ab9937c9",
  "version": 1,
  "memory_type": "entities"
}
-->