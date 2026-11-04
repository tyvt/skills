# Alinhamento de Formulário de Término de Acordo com 32px e Grid
No Suzhou Real Estate Monitoring V3, o espaçamento de colunas de formulário de detalhe foi ajustado para 32px com variável global e grid.

## Alteração
- Variável global `--detail-collapse-col-gap` ajustada de 24px para 32px; `.section-form` usa `column-gap` com essa variável.
- Campo largo via `.section-field--wide { grid-column: span 2 }`; fallback para coluna única em ≤768px ou `--full`.

## Verificação
- 验证证据: src=苏州市房地产监测V3/093.md
- 涉及文件: supervision/agreement/end/detail.vue, detailLayout.js, styles/index.scss, styles/detail-form.scss, detail-template.vue, Headline/index.vue, commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue, supervision/agreement/allocation/detail.vue
- Sessão de origem: c6c36197-e683-4727-86cf-a23980045e4e; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_32px_grid",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 1,
  "memory_type": "entities"
}
-->