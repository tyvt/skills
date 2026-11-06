# 列表统计文案统一改用zs-pagination组件
苏州市房地产监测V3 全局排查并删除手写重复统计文案，统一使用 `zs-pagination` 组件。

## 问题原因
- 多个列表页同时出现两处统计：`zs-pagination` 自带「共 N 条记录」与额外 `table-summary`/`total-count`/`table-footer` 手写统计

## 修改范围
- 删除 `EntrustBuildingTable.vue`、`mapProperty/index.vue` 等重复统计
- `PresaleBuildingTable.vue`、`PresaleHouseTable.vue`、`PermitHistoryPanel.vue`、`PermitEntrustPanel.vue`、`Step4Shareholders.vue`、`SurveyTopicInfoTable.vue` 等改为 `zs-pagination`

## 验证与归属
- 涉及 11 个文件，所属项目：苏州市房地产监测V3
- 来源会话：72ae64bd-b712-4696-939b-846ceff48c3c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_pagination_unify_fix",
  "source_extraction_id": "74dcd6685c0f46ef9abacd581112fee9",
  "version": 1,
  "memory_type": "entities"
}
-->