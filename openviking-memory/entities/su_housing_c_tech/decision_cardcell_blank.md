
# 决策记录CardCell致空白问题修复
苏住房C 决策记录页因 `CardCell` 导致空白问题，已在多个 cursor 会话修复。

## 问题根因
- `CardCell` 无数据时始终渲染占高及 `ZsImage` 高度，撑开过大空白（会话 3769efc4）
- 改成 `CardCell` 后在微信小程序里整块「决策信息」不渲染，出现完全空白（会话 e7007608）
- 原有布局未做条件渲染与紧凑处理

## 修复要点
- 改用 `v-if` 条件渲染，采用紧凑 `cell-item` 布局（会话 3769efc4）
- 固定 `sign-picture-wrap` 尺寸为 `153×68px`，下边距缩减至 `8px`
- 恢复 `cell-item` 布局，决策人、决策时间等文字字段正常显示（会话 e7007608）
- 签字图用固定尺寸 `sign-picture-wrap`（153×68）包裹 `ZsImage`，通过 `:deep(img)` 覆盖组件内部 `width: 100%`，避免图片高度塌成 0（会话 e7007608）

## 涉及文件
- src/pages_vote/decision/common/DecisionRecord.vue
- src/pages_vote/decision/common/ResultRecord.vue
- src/pages_vote/decision/styles/page.scss
- src/components/CardCell/CardCell.vue
- src/components/CardCell/CellFulline.vue
- src/components/ZsImage/ZsImage.vue
- src/pages_vote/decision/optional/DecisionResult.vue
- src/pages_vote/decision/sort/DecisionResult.vue

## 验证与归属
- 验证证据：extracted source=cursor session=3769efc4-10f9-4155-b4dd-4bcdbacd77a7、e7007608-941f-47f8-a082-3768ad6aa6e3
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_cardcell_blank",
  "source_extraction_id": "81e24c7fac0540d9acc9252dc29ce269",
  "version": 2,
  "memory_type": "entities"
}
-->