# 叙事行两端对齐与输入框满宽致溢出
苏州市房地产监测V3预售许可页中，叙事行两端对齐与输入框满宽导致布局溢出，已通过 flex 包裹与固定输入框宽度修复。

## 问题根因
- 叙事行使用 `text-align: justify` 拉散文字
- 数字输入框默认占满整行导致溢出

## 修复方案
- 移除 `text-align: justify`
- 叙事行改为 `flex` + `flex-wrap` 并包裹 `<span class="narrative-text">`
- 输入框固定宽度：数字 88px、面积 108px、地名 280px

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/094.md
- 涉及文件：PermitPlanPanel.vue、PresalePlanFillForm.vue、plan/detail.vue、detail.vue、Headline/index.vue、2026-09-11.md、presale-permit-helpers.js、PermitAppendixPanel.vue
- 所属项目：苏州市房地产监测V3；来源会话：3b1ff38c-e27a-4867-a215-6627c1d4380c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "narrative_row_overflow_fix",
  "source_extraction_id": "999b4bd863ec4b209ac8f3d1a7f02e39",
  "version": 1,
  "memory_type": "entities"
}
-->