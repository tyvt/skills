# Remoção de Borda em Abas e Alinhamento de Barra de Ferramentas
No Suzhou Real Estate Monitoring V3, estilo global remove borda de abas e alinha título com toolbar.

## Solução
- Em `index.scss`, `.tabs-content .collapse-container` usa `border: none !important` para sobrescrever borda scoped do `Headline` (exceto `border-only`, `appendix-section`).
- `.collapse-header` com `flex` + `nowrap`; zera `margin/padding` de `.operation-button-container` para alinhar título com toolbar `#right` (compatível com DOM de `zs-tabs.vue`).

## Verificação
- Evidência: src=苏州市房地产监测V3/093.md
- Arquivos: supervision/progress/change/detail.vue, BuildingChangeTable.vue, Headline/index.vue, styles/index.scss, supervision/progress/node/detail.vue, AgreementDetailsTable.vue, ShareholderTable.vue, supervision/unblock/usemoney/detail.vue
- Sessão de origem: 347d795c-a17e-454d-9b6d-e10334fa6635; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "tab_border_style_fix",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 1,
  "memory_type": "entities"
}
-->