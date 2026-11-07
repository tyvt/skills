# 构建报 API 未导出需于 companyApply 补
zhi2-web-admin build failed with "is not exported" because companyApply.js missed institution filing API exports.

## 根因
- zhi2-web-admin/src/api/company/companyApply.js 缺失机构备案 API 导出，致构建报 is not exported。

## 解决方案
- 在 companyApply.js 补全 getCompanyApplyCertificateInfo 等函数导出。
- agentTab.vue 从 @/api/system 导入引发无关构建失败需另查。

## 涉及文件
- companyApply.js、institution/record/components/RecordCertificateDialog.vue、institution/record/index.vue、company/companyApplyAudit/detail.vue、institution/record/components/ReplacePersonnelDialog.vue、institution/record/components/AgencyApplyDialog.vue、src/api/company/companyRecord.js、dist/assets/companyApply-DRQiD2E3.js。

## 关联信息
- 验证证据：src=苏州市房地产监测V3-leftover/002.md
- 来源会话：8570c278-55c3-4b1f-94fe-2e52d9744baf
- 项目：苏州市房地产监测V3（zhi2-web-admin）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "companyapply_api_export",
  "source_extraction_id": "c67ea4aee5d04fa28bdc88471a622b14",
  "version": 1,
  "memory_type": "entities"
}
-->
