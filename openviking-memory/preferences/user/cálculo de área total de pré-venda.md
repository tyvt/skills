- A «área total de pré-venda» do edifício é somada no frontend a partir dos dados de imóveis, não usando mais os campos `totalArea`/`houseArea` da API.
- `permitConstants.js` usa `sumPresaleHouseAreas` e encapsula `resolvePresaleHouseFloorArea` etc.; acumula com `add` de `@/utils/calculation` mantendo 2 casas decimais para evitar erro de ponto flutuante.
- `PresaleBuildingTable.vue` chama `computePresaleBuildingHouseArea(row, houses)` passando `houses` recebidos para renderizar a coluna «área total de pré-venda».

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Cálculo de área total de pré-venda",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 2,
  "memory_type": "preferences"
}
-->