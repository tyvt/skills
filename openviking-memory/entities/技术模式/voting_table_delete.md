# 选项表决VotingItemsTable删除按钮禁用修复
太仓G 选项表决详情待提交状态下，表决项操作列的删除按钮因写死 disabled 而无法点击，已改为与编辑按钮一致的可控状态。

## 问题根因
- optionDecision/components/VotingItemsTable.vue 操作列删除按钮写死 `disabled`，始终处于禁用状态
- 同列编辑按钮使用 `:disabled="bizState != '0'"`，待提交（bizState == '0'）时可点击

## 修复方案
- 删除按钮改为 `:disabled="bizState != '0'"`，与编辑按钮逻辑一致
- 待提交状态下操作列删除按钮可正常点击；顶部「批量删除」逻辑未改动

## 验证与归属
- 验证：刷新页面后在待提交状态尝试删除表决项
- 涉及文件：optionDecision/components/VotingItemsTable.vue、optionDecision/detail.vue、ownerDecision/components/VotingItemsTable.vue
- 所属项目：太仓G；来源会话：92a52a39-5ec2-4b9b-afa1-fb9772a75eae；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voting_table_delete",
  "source_extraction_id": "ac412ff13a2a482ea691d174b9542076",
  "version": 1,
  "memory_type": "entities"
}
-->