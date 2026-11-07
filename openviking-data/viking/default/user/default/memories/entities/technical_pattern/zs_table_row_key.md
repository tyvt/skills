# zs-table多选列未设row-key致更新报错
苏州市房地产监测V3 中 `DeliveryScopeSection` 内 `zs-table` 使用多选列未设 `row-key`，致数据更新报错。

## 问题根因
- `DeliveryScopeSection` 内 `zs-table` 使用 `zs-select-column` 多选列
- Element UI 的 `ElTable` 数据更新时强制要求 `row-key`，否则 `loadScopePage` 设置 `scopeList` 报错

## 解决方案
- 为 `zs-table` 添加 `:row-key="getRowKey"`
- `getRowKey` 返回 `row.deliveryScopeId`（已保存）或 `row.buildingId`（草稿）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/098.md
- 涉及文件：supervision/projectDelivery/components/DeliveryScopeSection.vue、components/zs-table/zs-table.vue、components/zs-table/zs-select-column.vue、supervision/projectDelivery/components/ProjectDeliveryDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：a11f72ad-6551-4d69-a2d0-e12bb33736a2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "zs_table_row_key",
  "source_extraction_id": "e144584a2db34952bb1d629f14ca179b",
  "version": 1,
  "memory_type": "entities"
}
-->