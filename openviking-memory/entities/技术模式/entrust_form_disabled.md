# Desativação de formulário de venda consignada bloqueia botões de anexo
No `detail.vue` de venda consignada, `:disabled="isFormDisabled"` do `zs-form` desabilita em cascata os botões da área de anexos; ao remover, `canOperateAppendix` passa a validar só `bizState === '0'`.

## Pontos de contrato
- `zs-form` em `detail.vue` com `:disabled="isFormDisabled"` desabilita em cascata botões da área de anexos
- Após remover, `canOperateAppendix` valida apenas `bizState === '0'`
- `FileList.vue` adiciona restrição `$attrs.operable` nos botões de observação/salvar fora de rascunho
- `entrust-sale-real-api-flow.spec.js` adiciona helper `assertEntrustSaleAppendixButtons` para validar

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/108.md
- Arquivos: presale/entrustSale/detail.vue, mixins/detailMixins.js, mixins/form.js, AnnexUpload/index.vue, AnnexUpload/components/FileList.vue, e2e/presale/entrust-sale-real-api-flow.spec.js, e2e/fixtures/entrust-sale-helpers.js, supervision/agreement/version/detail.vue
- Projeto: 苏州市房地产监测V3; sessão: 80d2603f-f2d9-4f58-9273-3841d86f0ce0; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_form_disabled",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 1,
  "memory_type": "entities"
}
-->