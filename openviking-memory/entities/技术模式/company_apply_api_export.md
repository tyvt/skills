# Exportação de APIs de CompanyApply Ausente Causa Erro de Build
No projeto Suzhou Real Estate Monitoring V3, a falta de exportação das APIs de inscrição de empresa em companyApply.js provocava falha no `npm run build`.

## 问题根因
- `zhi2-web-admin/src/api/company/companyApply.js` não exportava `getCompanyApplyCertificateInfo` e outras APIs de registro de instituição
- `npm run build` falhava com erro `is not exported`

## 解决方案
- Completar exportações em `companyApply.js`: `getCompanyApplyCertificateInfo`, `pageCompanyApply`, `getCompanyApplyDetail`
- Manter lógica de `getCompanyApplyOverview` passando `{}` quando não há `companyRecordId`

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3/198.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: companyApply.js, RecordCertificateDialog.vue, institution/record/index.vue, companyApplyAudit/detail.vue, ReplacePersonnelDialog.vue, AgencyApplyDialog.vue, companyRecord.js, dist/assets/companyApply-DRQiD2E3.js
- Sessão: 8570c278-55c3-4b1f-94fe-2e52d9744baf; Base: none


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "company_apply_api_export",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 1,
  "memory_type": "entities"
}
-->