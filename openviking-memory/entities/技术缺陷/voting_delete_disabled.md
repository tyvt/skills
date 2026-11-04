# 带有固定 disabled 的待定投票项删除按钮
VotingItemsTable.vue 中的删除按钮具有固定的 disabled，且不对 bizState 做出反应。

## 问题根因
- VotingItemsTable.vue 中删除按钮的 disabled 属性是固定的
- 不跟随 bizState 的变化，阻止了在待定状态下的点击

## 修复
- 改为 `:disabled="bizState != '0'"`，与编辑按钮保持一致
- 待定状态 (bizState='0') 允许点击删除

## 验证与归属
- 验证证据: extracted source=cursor session=92a52a39-5ec2-4b9b-afa1-fb9772a75eae
- 涉及文件: optionDecision/components/VotingItemsTable.vue, optionDecision/detail.vue, ownerDecision/components/VotingItemsTable.vue
- 所属项目: 太仓G; session: 92a52a39-5ec2-4b9b-afa1-fb9772a75eae; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Bug técnico",
  "name": "voting_delete_disabled",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->