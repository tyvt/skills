# 决策记录无数据时CardCell占位致空白过大
苏住房C 决策记录页 `CardCell` 无数据时仍渲染占位致空白过大，已在 cursor 会话 3769efc4 修复。

## 问题根因
- `CardCell` 无数据时始终渲染占高及 `ZsImage` 高度，撑开过大空白
- 原有布局未做条件渲染与紧凑处理

## 修复要点
- 改用 `v-if` 条件渲染，采用紧凑 `cell-item` 布局
- 固定 `sign-picture-wrap` 尺寸为 `153×68px`，下边距缩减至 `8px`

## 涉及文件
- src/pages_vote/decision/common/DecisionResult.vue
- src/pages_vote/decision/styles/page.scss
- src/components/CardCell/CardCell.vue
- src/components/CardCell/CellFulline.vue
- src/components/ZsImage/ZsImage.vue
- src/pages_vote/decision/common/DecisionRecord.vue
- src/pages_vote/decision/optional/DecisionResult.vue
- src/pages_vote/decision/sort/DecisionResult.vue

## 验证与归属
- 验证证据：extracted source=cursor session=3769efc4-10f9-4155-b4dd-4bcdbacd77a7
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_cardcell_blank",
  "source_extraction_id": "d87d02d750784fd08f483b63d35a6981",
  "version": 1,
  "memory_type": "entities"
}
-->