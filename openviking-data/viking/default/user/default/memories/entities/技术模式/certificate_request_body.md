# 证书请求体作为对象
在苏州市房地产监测V3项目的 zhi2-web-admin 中，证书接口的请求体应为对象 `{ companyApplyId }` 而非裸 ID。

## 实现
- `getCompanyApplyCertificateInfo` 调用 `POST('/company/companyApply/certificateInfo', { companyApplyId }, config)`
- 页面侧仍传递 `companyApplyId`，逻辑不变

## 文件
- api/jgyh/cbyh.js, views/supervision/bank/cbyh/detail.vue
- components/OperationBtnGroup/index.vue, api/company/companyApply.js
- api/company/personnelCertificate.js, companyApplyAudit/detail.vue
- institution/record/components/RecordCertificateDialog.vue, institution/record/index.vue

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/094.md
- 所属项目: 苏州市房地产监测V3; 会话: b13e0131-0391-4d9f-9e4c-9a23fc4f3322; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b13e0131-0391-4d9f-9e4c-9a23fc4f3322


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_request_body",
  "source_extraction_id": "49cdd093c09f43ab9dcf740eb82cca87",
  "version": 1,
  "memory_type": "entities"
}
-->
