# Corpo de requisição de certificado como objeto
No zhi2-web-admin do projeto 苏州市房地产监测V3 o corpo da interface de certificado deve ser objeto `{ companyApplyId }` e não ID nu.

## Implementação
- `getCompanyApplyCertificateInfo` chama `POST('/company/companyApply/certificateInfo', { companyApplyId }, config)`
- Lado da página ainda passa `companyApplyId` e lógica inalterada

## Arquivos
- api/jgyh/cbyh.js, views/supervision/bank/cbyh/detail.vue
- components/OperationBtnGroup/index.vue, api/company/companyApply.js
- api/company/personnelCertificate.js, companyApplyAudit/detail.vue
- institution/record/components/RecordCertificateDialog.vue, institution/record/index.vue

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/094.md
- Projeto: 苏州市房地产监测V3; sessão: b13e0131-0391-4d9f-9e4c-9a23fc4f3322; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_request_body",
  "source_extraction_id": "49cdd093c09f43ab9dcf740eb82cca87",
  "version": 1,
  "memory_type": "entities"
}
-->