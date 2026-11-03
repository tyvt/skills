# 踏勘表业务编码统一定义为 ysxkcs 常量
苏州市房地产监测V3 中硬编码 busCode 易致模块间不一致，故在 `permitConstants.js` 定义 `PERMIT_SURVEY_BUS_CODE = 'ysxkcs'`。

## 问题根因
- 硬编码 busCode 易致模块间不一致

## 修复方案
- 在 `permitConstants.js` 定义 `PERMIT_SURVEY_BUS_CODE = 'ysxkcs'`
- `PermitApprovalDialog.vue` 的 `annex-upload` 的 `:bus` 及 `validateSurveyFile()` 中 `listAppendixPackage` 的 `busCode` 统一引用该常量

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/214.md
- 涉及文件：zhi2-web-admin/src/views/presale/permit/permitConstants.js、zhi2-web-admin/src/views/presale/permit/components/PermitApprovalDialog.vue、zhi2-web-admin/e2e/presale/presale-permit-real-api-flow.spec.js、zhi2-web-admin/e2e/fixtures/presale-permit-helpers.js、zhi2-web-admin/src/views/presale/permit/components/PresaleProgressDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：b1bb7368-21ce-4ac4-9add-5db7c2bf8aa9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_survey_buscode",
  "source_extraction_id": "dd2d49bc6bd5474d9cb19e215fd2759b",
  "version": 2,
  "memory_type": "entities"
}
-->