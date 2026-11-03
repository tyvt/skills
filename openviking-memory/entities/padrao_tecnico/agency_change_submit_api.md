# API de Submissão de Alteração de Instituição Sobrescrita por Configuração
No projeto Suzhou Real Estate Monitoring V3, `resolveSubmitApi` lia meta de menu ou config de fluxo e fazia a alteração de instituição bater em interface antiga.

## Causa Raiz
- `resolveSubmitApi` prioriza `submitApi` do meta do menu ou da configuração de fluxo
- Isso fazia a requisição de alteração de instituição acertar a interface obsoleta

## Solução
- `src/views/toB/agencyRecord/detail.vue` fixa chamada a `COMPANY_RECORD_CHANGE_SPECIAL_SUBMIT_API`
- Removido o import de `resolveSubmitApi` nesse arquivo

## Verificação e Atribuição
- Evidência: src=苏州市房地产监测V3-rest/153.md
- Projeto: 苏州市房地产监测V3
- Arquivos: companyRecordChange.js, companyRecord.js, toB/companyRecord/detail.vue, toB/agencyRecord/detail.vue, companyRecordChangeRoute.js, AgencyBasicInfoDetail.vue, zljg/companyRecord/detail.vue, flowApi.js
- Sessão: 01a162e4-b96d-70c5-a400-760f72c3e01d; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "agency_change_submit_api",
  "source_extraction_id": "21ad71f1e972470cb366751ddbf5140c",
  "version": 1,
  "memory_type": "entities"
}
-->