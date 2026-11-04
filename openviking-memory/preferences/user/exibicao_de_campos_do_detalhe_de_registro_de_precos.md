- Em telas de detalhe de registro de preços (recordPriceMngSuzhou), prefere usar `slot` para campos editáveis e `text`/`textarea` com `autoHeight: true` para não editáveis, evitando corte.
- Em `detail-template.vue`, adicionar `isAutoHeightItem()` para suportar `item.autoHeight` e evitar corte de `textarea` dentro de `slot`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Exibição de campos do detalhe de registro de preços",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "preferences"
}
-->