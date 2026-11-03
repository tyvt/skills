# Upload de anexos de registro sem busId
No projeto Suzhou Real Estate Monitoring V3, o upload de anexos de registro não depende de busId e é processado pelo backend após submissão.

## Contexto
- Registro de empresa (`companyRegisterId`) ao puxar exigências sem modo de upload `busId` frequentemente retorna vazio
- Upload de anexos não depende de `busId`, mas sim de `saveAndSubmit` que envia `attachmentList` para o backend tratar a montagem

## Arquivos Envolvidos
- `AnnexUpload/components/AppendixRequirementCard.vue`
- `utils/appendix.js`
- `views/register/companyRegister.vue`
- `views/register/components/single-page/CompanyRegisterSingleForm.vue`
- `views/institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue`
- `api/company/companyRegister.js`
- `views/institutionRegister/components/InstitutionUploadItem.vue`

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/025.md
- ID de sessão: 2026e41e-c4eb-4375-afbb-6894581445bf
- Projeto: Suzhou Real Estate Monitoring V3; linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "register_attachment_nobusid",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->