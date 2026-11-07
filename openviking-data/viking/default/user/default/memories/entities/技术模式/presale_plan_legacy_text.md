# 预售方案历史文本未解析致橙色提示残留
苏州市房地产监测V3 预售方案 PresalePlanFillForm.vue 因历史文本未解析导致橙色 legacyText 残留，新增逆向解析函数回填。

## 问题根因
- PresalePlanFillForm.vue 历史文本 completionPlan/deliveryPlan/progressPlan 未解析
- 导致橙色 legacyText 提示残留于表单输入框

## 修复方案
- 新增 parseCompletionPlanLegacy 等逆向解析函数
- normalizePlanRows 优先解析历史文本回填输入框

## 涉及文件
- PresalePlanFillForm.vue
- plan/detail.vue
- permitConstants.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/223.md
- 来源会话：5acc9195-8501-4cfe-9592-46ae040470a2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_legacy_text",
  "source_extraction_id": "8b8969cc4b26467f9fcb5928d426f082",
  "version": 1,
  "memory_type": "entities"
}
-->