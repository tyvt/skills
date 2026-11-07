# 预售历史文本解析回填至输入框
预售方案历史文本经逆向解析函数回填至结构化输入框以消除橙色 legacyText 展示。

## 问题根因
- 预售方案历史文本原以橙色 `legacyText` 展示，未结构化回填。

## 解决方案
- `PresalePlanFillForm.vue` 中 `parseFlexibleDate` 支持无日日期。
- 新增 `parseCompletionPlanLegacy` 等解析竣工/交付/进度文本。
- `normalizePlanRows` 在结构化数据缺失时触发解析，失败保留原提示。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/022.md
- 涉及文件：PresalePlanFillForm.vue、plan/detail.vue、permitConstants.js
- 所属项目：苏州市房地产监测V3；来源会话：5acc9195-8501-4cfe-9592-46ae040470a2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_legacy_parse",
  "source_extraction_id": "24ce2097e17b4d698afe338a8b2912e2",
  "version": 1,
  "memory_type": "entities"
}
-->