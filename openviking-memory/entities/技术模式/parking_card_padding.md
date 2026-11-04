# Card de resumo de vagas de estacionamento
O componente operatingAssets.vue tinha espaçamento inconsistente no card de vagas por falta de padding.

## Description
- .parking-total-card em operatingAssets.vue não tinha padding:10px 0 14px
- Outros Tabs usam operating-assets__stats com esse mesmo padding
- Correção aplicada: adicionar padding:10px 0 14px ao .parking-total-card

## Purpose
- Manter consistência de espaçamento entre as abas da página de ativos operacionais

## Relations
- 涉及文件: benefit/statisticsMapDetail/index.vue, benefit/statisticsMap/operatingAssets.vue, components/Headline/index.vue, benefit/statisticsMap/overviewContent.vue, benefit/statisticsMap/assetLease.vue
- Sessão cursor: 870b5b21-223f-480d-b1ef-f92c770baf5b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_card_padding",
  "source_extraction_id": "e8a7bac845c54be09b1a363a7c43e8e5",
  "version": 1,
  "memory_type": "entities"
}
-->