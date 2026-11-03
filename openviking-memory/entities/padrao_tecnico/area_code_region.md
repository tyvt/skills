# Mudança de Campo areaCode para region em Venda Consignada
No projeto Suzhou Real Estate Monitoring V3, campo da API backend `areaCode` mudou para `region`; frontend sincronizado.

## Causa
- Interface backend alterou `areaCode` para `region`

## Solução
- `detail.vue` `normalizeDetail` lê apenas `data.region`; `buildSavePayload` envia `region`
- `entrust-sale-helpers.js` assertiva E2E muda campo para `region`
- Sem referências `areaCode` globais

## Verificação
- Evidência: src=苏州市房地产监测V3/239.md
- Arquivos: presale/entrustSale/detail.vue, presale/entrustSale/index.vue, e2e/fixtures/entrust-sale-helpers.js, mixins/detailMixins.js, e2e/presale/entrust-sale-real-api-flow.spec.js, mixins/form.js
- Projeto: Suzhou Real Estate Monitoring V3; Sessão: 74428e0b-126e-4f90-9fc3-2fbe6b27a399; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "area_code_region",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 1,
  "memory_type": "entities"
}
-->