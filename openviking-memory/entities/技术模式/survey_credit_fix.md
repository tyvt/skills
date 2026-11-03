# 测绘变更选项目信用代码字段映射缺失致未回填修复
`/presale/surveyChange/selectProject` 返回 `uniformSocialCreditCode` 但 `handleProjectSelect` 仅映射旧字段致代码未回填。

## 问题根因
- `/presale/surveyChange/selectProject` 返回 `uniformSocialCreditCode`
- `handleProjectSelect` 仅映射旧字段，致信用代码未回填

## 修复方案
- `surveyChangeConstants.js` 新增 `resolveSurveyChangeCreditCode` 与 `mapSurveyChangeProjectRow` 统一处理
- `detail.vue` 的 `handleProjectSelect` 改用上述函数

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/281.md
- 涉及文件：presale/surveyChange/detail.vue、surveyChangeConstants.js、permitCancel/detail.vue、zs-select-dialog-func.vue、presale-survey-change-helpers.js、permitExtend/detail.vue、entrustSale/detail.vue、apiV3Normalize.js
- 所属项目：苏州市房地产监测V3；来源会话：754ddf0b-9295-4421-b9b9-93fc87b9b996；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_credit_fix",
  "source_extraction_id": "c8b2ccc826f04b5795a9822e8b7419bd",
  "version": 1,
  "memory_type": "entities"
}
-->