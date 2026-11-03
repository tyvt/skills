# 预售变更新增接口企业信息改为必传
/presale/surveyChange/add 的 enterpriseId、enterpriseName 需必传，surveyChangeConstants.js 中 buildSurveyChangeAddPayload 改为始终包含企业信息。

## 问题根因
- /presale/surveyChange/add 的 enterpriseId、enterpriseName 需必传

## 修复方案
- surveyChangeConstants.js 中 buildSurveyChangeAddPayload 改为始终包含 enterpriseId: form.companyId ?? form.enterpriseId
- 同时包含 enterpriseName: form.companyName ?? form.enterpriseName

## 验证与归属
- 验证证据：extracted source=cursor session=3fcd2a44-a794-455b-978e-7d343ece8595
- 涉及文件：surveyChangeConstants.js、detail.vue、presale-survey-change-helpers.js
- 来源会话ID：3fcd2a44-a794-455b-978e-7d343ece8595

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_change_enterprise",
  "source_extraction_id": "51f806c5ee534d2b8091b45602152e6a",
  "version": 1,
  "memory_type": "entities"
}
-->