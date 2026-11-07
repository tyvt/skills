# 在10个文件中移除环境分支
在项目 苏州市房地产监测V3 中，为了统一通用逻辑，从多个文件中移除了环境分支。

## 变更
- 在 notice/detail.vue、usemoney/detail.vue 和其他10个文件中，移除了 isSuzhouzhizai/currentEnvironment 分支
- 银行账户统一为通用字段 ${frontLabel}/${frontBank}
- defaultTabList 固定为三个标签页：用款明细, 关联楼幢, 股东信息

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f81fe328-0c4a-411a-b2a9-b762808390a4
- 验证证据: src=苏州市房地产监测V3/179.md
- 涉及文件: notice/detail.vue, AppropriationBuildingsTable.vue, usemoney/detail.vue, RelatedBuildingsTable.vue, usemoneyRevoke/detail.vue, BuildingTable.vue, AppropriateTable.vue
- 会话: f81fe328-0c4a-411a-b2a9-b762808390a4; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "env_branch_unify",
  "source_extraction_id": "637076c2ee6643d5b35f55f28e70f356",
  "version": 1,
  "memory_type": "entities"
}
-->