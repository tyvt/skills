# 证书请求体涉及 companyApplyId
项目 苏州市房地产监测V3 的 zhi2-web-admin 修改了证书 API 以发送对象 { companyApplyId } 而不是直接 ID。

## 变更
- API 原本直接发送 ID 作为 body
- 现在使用对象 { companyApplyId } 格式
- getCompanyApplyCertificateInfo 调用 POST('/company/companyApply/certificateInfo', { companyApplyId }, config)
- 页面端的参数传递逻辑保持不变

## 文件
- api/jgyh/cbyh.js, api/company/companyApply.js, api/company/personnelCertificate.js
- supervision/bank/cbyh/detail.vue, companyApplyAudit/detail.vue
- components/OperationBtnGroup/index.vue, institution/record/components/RecordCertificateDialog.vue
- institution/record/index.vue

## 验证
- 验证证据: src=苏州市房地产监测V3/141.md
- 所属项目: 苏州市房地产监测V3; session: b13e0131-0391-4d9f-9e4c-9a23fc4f3322; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b13e0131-0391-4d9f-9e4c-9a23fc4f3322


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_api_body_wrap",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 1,
  "memory_type": "entities"
}
-->
