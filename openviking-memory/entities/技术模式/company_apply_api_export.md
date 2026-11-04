# CompanyApply API 导出缺失导致构建错误
在苏州市房地产监测V3项目中，companyApply.js 中缺少企业申请 API 的导出导致 `npm run build` 失败。

## 问题根因
- `zhi2-web-admin/src/api/company/companyApply.js` 未导出 `getCompanyApplyCertificateInfo` 和其他机构登记 API
- `npm run build` 失败，报错 `is not exported`

## 解决方案
- 补全 `companyApply.js` 中的导出：`getCompanyApplyCertificateInfo`, `pageCompanyApply`, `getCompanyApplyDetail`
- 保持 `getCompanyApplyOverview` 的逻辑，当没有 `companyRecordId` 时传入 `{}`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/198.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: companyApply.js, RecordCertificateDialog.vue, institution/record/index.vue, companyApplyAudit/detail.vue, ReplacePersonnelDialog.vue, AgencyApplyDialog.vue, companyRecord.js, dist/assets/companyApply-DRQiD2E3.js
- 会话: 8570c278-55c3-4b1f-94fe-2e52d9744baf; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "company_apply_api_export",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 1,
  "memory_type": "entities"
}
-->