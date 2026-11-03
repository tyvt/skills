- A «área total de pré-venda» do edifício é somada no frontend a partir dos dados de imóveis; `permitConstants.js` usa `sumPresaleHouseAreas` com `add` de `@/utils/calculation` para acumular mantendo 2 casas decimais e evitar erro de ponto flutuante. `PresaleBuildingTable.vue` chama `computePresaleBuildingHouseArea(row, houses)` com os `houses` recebidos.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Cálculo de área total de pré-venda",
  "source_extraction_id": "cdba16e1b48b43e19c67c704e7a4b0f6",
  "version": 1,
  "memory_type": "preferences"
}
-->