# Interface de venda consignada muda parâmetro areaCode para region
No projeto Suzhou Real Estate Monitoring V3, o backend alterou campo de entrada e resposta de detalhe de areaCode para region na interface de venda consignada; frontend não estava alinhado.

## 问题根因
- Backend mudou parâmetro de add/edit e campo de resposta de detalhe de `areaCode` para `region`
- Frontend não alinhado causando descompasso

## 解决方案
- `detail.vue` `normalizeDetail` passou a ler apenas `data.region`; `buildSavePayload` envia `region: form.region`
- `entrust-sale-helpers.js` assertiva E2E mudou de `'areaCode'` para `'region'`
- Formulário internamente ainda usa `form.region`; lógica de exibição inalterada

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3-leftover/039.md
- 涉及文件: presale/entrustSale/detail.vue, index.vue, e2e/fixtures/entrust-sale-helpers.js, detailMixins.js, e2e/presale/entrust-sale-real-api-flow.spec.js, form.js
- Sessão: 74428e0b-126e-4f90-9fc3-2fbe6b27a399; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_region_fix",
  "source_extraction_id": "6e670e2c1ff04c55bcebae32cab0400f",
  "version": 1,
  "memory_type": "entities"
}
-->