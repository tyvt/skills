# Correção de parâmetro companyRecordId em interface de mudança
No projeto zhi2-web-admin, corrigiu-se falta de companyRecordId na API de mudança de registro de agência.

## Correção
- `companyRecord.js` `getLastChangeByLogin` recebe parâmetros opcionais `data`/`config` para compatibilidade
- `companyRecordAgency/detail.vue` `startChange()` passa `{ companyRecordId: this.companyRecordId }`
- Lado de locação (租赁端) passa a reusar a chamada corretamente

## Arquivos
- src/api/company/companyRecord.js
- src/views/company/companyRecordAgency/detail.vue
- src/views/company/companyManagement/components/AgencyBasicInfoDetail.vue
- src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue
- src/views/zljg/companyRecordAgency/detail.vue
- e2e/company/company-record-flow.spec.js
- src/views/company/companyRecordAgency/index.vue

## Verificação
- Sessão: 7228345d-b39b-4e14-b319-e0de248ed26e

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "record_id_param",
  "source_extraction_id": "a4c1b4b28e954766b9f8128b10303b6f",
  "version": 1,
  "memory_type": "entities"
}
-->