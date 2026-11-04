# StepChoose选中背景与间距未匹配设计
苏住房C 投票/决策页 `StepChoose` 选项卡的选中态样式与间距未匹配设计稿，已在 cursor 会话 dc5fd0f1 修复。

## 问题根因
- `optional/StepChoose.vue` 中 `.checkbox-item.active` 选中态背景与文字色未匹配设计稿
- `.top-card` 底部 `padding` 过大，与设计间距不符

## 修复要点
- `.checkbox-item.active` 背景设为 `rgba(19, 84, 190, 0.08)`，文字使用主题色
- `.top-card` 底部 `padding` 改为 `16px`

## 涉及文件
- src/pages_vote/decision/components/RadioGroup.vue
- src/pages_vote/decision/optional/StepChoose.vue
- src/pages_vote/decision/form.vue
- src/pages_vote/decision/common/StepChoose.vue
- src/pages_vote/decision/sort/StepChoose.vue
- src/pages_vote/decision/styles/card.scss
- src/components/ZsCheckbox/ZsCheckbox.vue
- src/pages_vote/decision/styles/btn.css

## 验证与归属
- 验证证据：extracted source=cursor session=dc5fd0f1-3aee-4d8e-bd02-8a8f3bf31cb2
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stepchoose_active_style",
  "source_extraction_id": "d87d02d750784fd08f483b63d35a6981",
  "version": 1,
  "memory_type": "entities"
}
-->