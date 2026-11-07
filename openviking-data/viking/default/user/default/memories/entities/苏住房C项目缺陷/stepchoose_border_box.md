# 缺少 border-box 的 StepChoose 选项导致宽度溢出
在 Su Housing C 项目中，缺少 box-sizing border-box 的 StepChoose 选项导致宽度溢出以及高亮背景紧贴边框。

## 问题根因
- optional/StepChoose.vue 未定义 box-sizing: border-box 导致宽度溢出
- overflow: hidden 和默认对齐方式阻碍了期望的布局

## 修正
- 设置 box-sizing: border-box 和 padding: 24rpx 28rpx
- 移除 overflow: hidden 并调整左对齐以符合图2的布局

## 涉及的文件
- src/pages_vote/decision/form.vue
- src/pages_vote/decision/optional/StepChoose.vue
- src/pages_vote/decision/common/StepChoose.vue
- src/pages_vote/decision/components/RadioGroup.vue
- src/pages_vote/decision/sort/StepChoose.vue
- src/pages_vote/decision/styles/card.scss
- src/components/ZsCheckbox/ZsCheckbox.vue

## 验证
- 验证证据: extracted source=cursor session=7596f0ef-5187-468b-8b37-d30dd7fc905d
- 所属项目: Su Housing C (zhi2-mobile-shimin); 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stepchoose_border_box",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->