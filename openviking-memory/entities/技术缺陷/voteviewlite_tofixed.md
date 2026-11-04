# VoteViewLite 未使用 toFixed 导致生成过多小数位
VoteViewLite.vue 中的计算比例属性直接返回了 float，且 v-money:2 指令未格式化异步更新。

## 问题根因
- VoteViewLite.vue 中的计算比例属性直接返回了浮点结果
- v-money:2 指令不格式化异步更新值，导致生成过多小数位

## 修复
- 在计算属性中使用 toFixed(2) 以保留两位小数
- 行为与 VoteView.vue 保持一致

## 验证与归属
- 验证证据: extracted source=cursor session=b1f6d756-0df5-4c21-989e-f70ed877907d
- 涉及文件: optionDecision/components/VoteView.vue, optionDecision/components/VotingItemsTable.vue, optionDecision/detail.vue, ownerDecision/components/VoteView.vue, optionDecision/components/MaintainResultDialog.vue, decisionCommon/components/VoteViewLite.vue, directives/money.js, formatters/index.js
- 所属项目: 太仓G; 会话: b1f6d756-0df5-4c21-989e-f70ed877907d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "",
  "name": "voteviewlite_tofixed",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->