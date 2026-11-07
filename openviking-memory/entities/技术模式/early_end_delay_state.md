# 无延期状态下隐藏的提前结束按钮
在常规决策详情页 (generalDecision/detail.vue) 中，提前结束按钮在延期状态下不显示。

## 问题根因
- “提前结束”按钮仅在 `decisionState == '2'` 时显示
- 延期状态 (`'5'`) 不满足该条件

## 修正
- 在 `detail.vue` 中，按钮的 `v-if` 加入了 `decisionState == '5'`
- 保留了权限验证，与其他决策页面保持一致

## 验证与文件
- 源会话: 5498a264-de28-46af-8525-e64606a2220e
- 涉及文件: generalDecision/detail.vue, ownerDecision/detail.vue, optionDecision/detail.vue, sortDecison/detail.vue, maintainDecision/detail.vue
- 所属项目: 太仓G; 代码库: none

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 来源会话：5498a264-de28-46af-8525-e64606a2220e


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "early_end_delay_state",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->
