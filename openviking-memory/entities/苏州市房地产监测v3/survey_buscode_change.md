# 踏勘表 busCode 变更
苏州市房地产监测V3 中将踏勘表 busCode 变更为 'ysxkcs' 并完成相关常量与组件同步。

## 变更内容
- permitConstants.js 新增常量 PERMIT_SURVEY_BUS_CODE = 'ysxkcs'，与 PERMIT_APPENDIX_BUS_CODE = 'ysxksq' 并列。
- PermitApprovalDialog.vue 引入该常量，annex-upload 的 :bus 改用此常量。
- validateSurveyFile() 中 listAppendixPackage 的 busCode 同步更新，文件头注释改为 busCode=ysxkcs。

## 验证与归属
- 涉及文件：permitConstants.js、PermitApprovalDialog.vue、presale-permit-real-api-flow.spec.js。
- 所属项目：苏州市房地产监测V3；来源会话：b1bb7368-21ce-4ac4-9add-5db7c2bf8aa9。

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "survey_buscode_change",
  "source_extraction_id": "844cdb82624f4fef9399a4f794b17314",
  "version": 1,
  "memory_type": "entities"
}
-->