# Fonte principal do valor atual na página de alteração é o detalhe de alteração
No projeto 苏州市房地产监测V3, os dados mestres das informações básicas da empresa no "valor atual" da página de alteração vêm da interface de detalhe de alteração.

## Fatos principais
- O "valor atual" das informações básicas da empresa vem de `POST /company/companyRecordChange/detail` em `data.companyRecordChange`
- `toB/companyRecord/detail.vue` grava o detalhe da alteração no formulário via `getDetail()`
- `companyRecord/detail` serve apenas para comparação pré-alteração ou fallback de qualificação

## Verificação e origem
- Evidência: src=cursor session=3f9ce4c0-b3bb-452e-a7ac-6701f6c35e2e
- Arquivos: toB/companyRecord/detail.vue, api/company/companyRecord.js, company/companyManagement/components/DeveloperBasicInfoDetail.vue, DeveloperBasicInfoForm.vue, utils/registerQualification.js
- Projeto: 苏州市房地产监测V3; sessão: 3f9ce4c0-b3bb-452e-a7ac-6701f6c35e2e

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "company_change_current_source",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->