# Lista de cancelamento de instituição deve usar companyType
A condição de busca «tipo de instituição» na lista de cancelamento usava organType erroneamente; o backend exige companyType para filtro do usuário.

## 问题根因
- Lista de cancelamento de instituição usava organType no filtro de tipo de instituição
- organType é contexto fixo (agency/lease); filtro do usuário deve passar companyType

## 解决方案
- companyCancel/index.vue: parâmetros de consulta e formulário de busca alterados para companyType
- Requisição de lista fixa organType como this.resolvedOrganType (via CompanyOrganProvider ou meta de rota)
- Comportamento alinhado a companyRecordAgency/index.vue

## Arquivos envolvidos
- src/views/company/companyCancel/index.vue e detail.vue
- src/api/company/companyCancel.js e src/mixins/companyOrganContext.js
- src/views/zljg/companyCancel/index.vue e src/views/company/companyRecordAgency/index.vue
- src/constants/companyOrgan.js e e2e/list/list-card-spacing.spec.js

## Verificação
- 验证证据: src=苏州市房地产监测V3-leftover/058.md; Sessão: 50257d35-25d2-4753-bbb1-55a3c981474e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_companytype",
  "source_extraction_id": "2ad82671c0ec46a89bf7f8171f0d0fa6",
  "version": 1,
  "memory_type": "entities"
}
-->