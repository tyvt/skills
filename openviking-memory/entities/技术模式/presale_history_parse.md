# 预售方案历史文本自动解析回填
苏州市房地产监测V3 中 `PresalePlanFillForm.vue` 完成历史文本自动解析回填改造。

## 改动说明
- `parseFlexibleDate` 除 `yyyy年M月d日` 外支持 `yyyy年M月`（无日）→ `yyyy-MM-01`
- 新增 `parseCompletionPlanLegacy` 解析 `1幢2027年1月13日竣工`
- 新增 `parseDeliveryPlanLegacy` 解析 `1幢2027年5月13日交付`
- 新增 `parseProgressPlanLegacy` 解析含「开工/基础工程/结构封顶/竣工交付」整段文本
- 改造 `normalizePlanRows`：结构化数组有效则直接用，否则尝试解析历史文本，成功填入输入框不再显示橙色 `legacyText`，失败保留提示

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`PresalePlanFillForm.vue`、`plan/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：5acc9195-8501-4cfe-9592-46ae040470a2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_history_parse",
  "source_extraction_id": "8e0e61e5a3c841b68158d2e24ffb43c0",
  "version": 1,
  "memory_type": "entities"
}
-->