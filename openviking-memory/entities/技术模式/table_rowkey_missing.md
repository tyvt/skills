# zs-table多选列未设row-key报警告
苏州市房地产监测V3 中 ServiceSchemePanel.vue 的 zs-table 使用 zs-select-column 未配置 row-key，数据更新触发 ElTable 报错。

## 问题根因
- `ServiceSchemePanel.vue` 中 `zs-table` 使用 `zs-select-column` 未配置 `row-key`
- 数据更新触发 ElTable `data` watcher 报错

## 解决方案
- 参照 `EducationTable.vue` 添加 `row-key="_rowKey"` 并逐行生成
- `emitChange` 剥离 `_rowKey`，批量删除改按 `_rowKey` 过滤

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/111.md
- 涉及文件：ServiceSchemePanel.vue、zs-table.vue、EducationTable.vue、AgencyBranchDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：25e4469c-7d8e-407b-89ca-9f7744f1f475；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_rowkey_missing",
  "source_extraction_id": "c7a7f46ab8b2402891ec68878f84c6aa",
  "version": 1,
  "memory_type": "entities"
}
-->