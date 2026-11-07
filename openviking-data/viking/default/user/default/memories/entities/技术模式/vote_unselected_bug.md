# 非必填投票中“未选择”的显示
当投票非必填且未投票时，`ViewOptionsList.vue` 和 `DescribePopup.vue` 中的选项区域显示“暂未选择”；新增了 prop `readOnly`。

## 问题根因
- 投票选项区域在非必填且未投票时未显示统一状态
- 原有逻辑依赖于 `decisionRequired == '1'`

## 解决方案
- `ViewOptionsList.vue` 和 `DescribePopup.vue` 统一显示“暂未选择”
- `DescribePopup.vue` 从父组件接收新的 prop `readOnly` 用于只读场景

## 验证与归属
- 验证证据: extracted source=cursor session=ea6407fc-4a97-464f-86b5-f338dfb9dbb6
- 涉及文件: src/pages_owner/decision/components/multiple/ViewOptionsList.vue, src/pages_owner/decision/multipleForm.vue, src/pages_owner/decision/components/multiple/DescribePopup.vue, src/pages_owner/decision/components/multiple/OptionCardList.vue
- 所属项目: Huishan Fase 2 H5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "vote_unselected_bug",
  "source_extraction_id": "17091e7715aa4ddb9e280040c40385ed",
  "version": 1,
  "memory_type": "entities"
}
-->