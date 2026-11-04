# RadioGroup按序绑色致选项颜色错位
苏住房C 投票/决策页中 `RadioGroup` 按列表顺序（`item-1/2/3`）绑定颜色，接口返回顺序不固定时导致选项颜色错位。

## 问题根因
- `RadioGroup` 按列表顺序 `item-1/2/3` 绑定颜色
- 接口返回顺序不固定时，颜色与选项错位

## 修复要点
- 改为按选项文字映射颜色：同意绿 / 不同意红 / 弃权橙
- 调整 `DetailTopCard` 渐变起始为 15% 透明
- `form.vue` 按钮圆角 8px
- `DecisionResult.vue` 间距 20px

## 涉及文件
- src/pages_vote/decision/common/DecisionRecord.vue
- src/pages_vote/elect/ResultRecord.vue
- src/pages.json
- src/pages_owner/decision/common/StepChoose.vue
- src/pages_owner/decision/components/RadioGroup.vue
- src/pages_owner/decision/common/DecisionResult.vue
- src/pages_vote/decision/common/StepChoose.vue
- src/pages_vote/decision/components/RadioGroup.vue

## 验证与归属
- 验证证据：extracted source=cursor session=a8484b7a-a33d-4ba0-b1e1-1102d7ae0a91
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：a8484b7a-a33d-4ba0-b1e1-1102d7ae0a91；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "radiogroup_color_mismatch",
  "source_extraction_id": "41104766f2154919ae35cea9ede14f5c",
  "version": 1,
  "memory_type": "entities"
}
-->