
# Substituição do path do map.js por fronteira oficial simplificada
Regiões poligonais regulares não seguem contorno real; usa-se fonte oficial de divisão administrativa 320214 com simplificação preservando forma (580 pontos reduzidos a 74) e substitui-se a string de pontos do polígono em map.js.

## Contexto
- Polígonos de regra não aderem ao contorno real da divisão administrativa
- Fonte oficial de divisão 320214 fornece coordenadas de fronteira

## Solução
- Aplicar simplificação preservando forma (580 pontos para 74 pontos) na fronteira oficial
- Substituir o `path` de `map.js` pela string de pontos do polígono de fronteira oficial

## Arquivos e proveniência
- Arquivos: src/views/benefit/statisticsMap/components/map.vue, src/components/ZsTencentMap/index.vue, src/components/ZsTencentMap/mapLoader.js, src/views/benefit/statisticsMap/operatingAssets.vue, src/views/benefit/statisticsMap/mockApi.js, src/views/benefit/statisticsMap/mock.js, src/views/benefit/statisticsMap/components/ParkingAssetDialog.vue, src/views/benefit/statisticsMap/components/VenueAssetDialog.vue
- Projeto: 产品2.0; sessão: 95e2008d-fb62-4d82-a1ce-c691d8ecfd29; base: none; evidência: 产品2.0/030.md


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_path_boundary",
  "source_extraction_id": "4d80bcc2a01b4c9daeb3c9c060bc1073",
  "version": 1,
  "memory_type": "entities"
}
-->