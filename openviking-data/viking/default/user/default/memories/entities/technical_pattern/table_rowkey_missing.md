
# zs-table多选列未设row-key报警告
苏州市房地产监测V3 中 zs-table 使用 zs-select-column 未配置 row-key，数据更新触发 ElTable 报错。

## 问题根因
- `ServiceSchemePanel.vue` 中 `zs-table` 使用 `zs-select-column` 未配置 `row-key`
- 数据更新触发 ElTable `data` watcher 报错
- `DeliveryScopeSection.vue` 的 `zs-table` 使用 `zs-select-column` 多选列，数据更新时须提供 `row-key`，否则 `loadScopePage` 设置 `scopeList` 报错

## 解决方案
- 参照 `EducationTable.vue` 添加 `row-key="_rowKey"` 并逐行生成
- `emitChange` 剥离 `_rowKey`，批量删除改按 `_rowKey` 过滤
- `DeliveryScopeSection.vue` 绑定 `:row-key="getRowKey"`，方法返回 `row.deliveryScopeId || row.buildingId` 区分已保存记录与草稿楼幢

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/111.md；另 src=苏州市房地产监测V3/299.md
- 涉及文件：ServiceSchemePanel.vue、zs-table.vue、EducationTable.vue、AgencyBranchDetail.vue、DeliveryScopeSection.vue、zs-select-column.vue、ProjectDeliveryDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：25e4469c-7d8e-407b-89ca-9f7744f1f475；另 a11f72ad-6551-4d69-a2d0-e12bb33736a2；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "table_rowkey_missing",
  "source_extraction_id": "1b549fb6f5f74e96a56ee33f14963762",
  "version": 2,
  "memory_type": "entities"
}
-->