# Corpo de requisição de certificado envolve companyApplyId
O zhi2-web-admin do projeto 苏州市房地产监测V3 alterou API de certificado para enviar objeto { companyApplyId } em vez de ID direto.

## Mudança
- API originalmente enviava ID direto como body
- Agora usa formato objeto { companyApplyId }
- getCompanyApplyCertificateInfo chama POST('/company/companyApply/certificateInfo', { companyApplyId }, config)
- Lógica de passagem de parâmetro no lado da página permanece inalterada

## Arquivos
- api/jgyh/cbyh.js, api/company/companyApply.js, api/company/personnelCertificate.js
- supervision/bank/cbyh/detail.vue, companyApplyAudit/detail.vue
- components/OperationBtnGroup/index.vue, institution/record/components/RecordCertificateDialog.vue
- institution/record/index.vue

## Verificação
- Evidência: src=苏州市房地产监测V3/141.md
- Projeto: 苏州市房地产监测V3; sessão: b13e0131-0391-4d9f-9e4c-9a23fc4f3322; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_api_body_wrap",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 1,
  "memory_type": "entities"
}
-->