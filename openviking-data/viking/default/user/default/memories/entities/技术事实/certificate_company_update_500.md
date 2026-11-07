# 证书 companyUpdate 编辑接口返回 500
苏州市房地产监测V3 中企业人员证书编辑接口 POST /company/personnelCertificate/companyUpdate 返回 500 服务器异常，需排查。

## 现象
- E2E 文件 `e2e/company/personnel-record.spec.js` 验证 `POST /company/personnelCertificate/companyAdd` 证书新增通过并返回 ID
- `POST /company/personnelCertificate/companyUpdate` 编辑返回 500 服务器异常，需排查请求体及后端处理逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/312.md
- 涉及文件：e2e/company/personnel-record.spec.js、package.json、playwright.config.js、test-results 错误上下文、certificatesDialog.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：084280e9-5e64-4d3d-b430-7c85282061df；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术事实",
  "name": "certificate_company_update_500",
  "source_extraction_id": "2080a0baaff942c089970729ab9937c9",
  "version": 1,
  "memory_type": "entities"
}
-->