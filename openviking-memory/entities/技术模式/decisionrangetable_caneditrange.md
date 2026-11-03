# zs-button disabled 与 bizState 比较错误致删除按钮不可见
zs-button 的 disabled 触发 display:none，且 bizState 为数字 0 时 != '0' 为真，叠加 decisionCommon 中 v-if="false" 硬编码，导致删除按钮不可见。

## 问题根因
- zs-button 的 disabled 会触发 display:none 隐藏元素
- bizState 为数字 0 时 `!= '0'` 判断为真，状态比较错误
- decisionCommon 中 v-if="false" 硬编码，删除按钮不可见

## 解决方案
- 新增 canEditRange（String(bizState)==='0'）统一控制 DecisionRangeTable 新增/删除按钮及勾选列显示

## 验证与归属
- 验证证据：extracted source=cursor session=0850e1ff-df7c-4b1c-8ed7-feb865586b49
- 涉及文件：optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue、components/zsButton/index.vue、optionDecision/components/VotingItemsTable.vue、decisionCommon/components/DecisionRangeTable.vue、ownerDecision/components/DecisionRangeTable.vue、ownerDecision/detail.vue、optionDecision/index.vue
- 所属项目：太仓G；来源会话：0850e1ff-df7c-4b1c-8ed7-feb865586b49；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decisionrangetable_caneditrange",
  "source_extraction_id": "dee365f6667649d6b5647eae46defd78",
  "version": 1,
  "memory_type": "entities"
}
-->