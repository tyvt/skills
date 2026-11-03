# Normalização de mapeamento de campo de prédio supervisionado
No módulo de supervisão de pré-venda do Suzhou Real Estate Monitoring V3, a interface de prédio em `SupervisionTable.vue` foi substituída por `/building/building/selectBuilding`, com a coluna prop alterada de `constructionNo` para `buildingNo`.

## Pontos de correção
- `SupervisionTable.vue` substitui a interface de prédio por `/building/building/selectBuilding`
- Coluna prop alterada de `constructionNo` para `buildingNo`
- `setData` percorre as linhas realmente selecionadas, compatível com mapeamento de campos antigos `buildingNo`/`buildingArea`

## Arquivos envolvidos
- SelectBuildingDialog.vue, SupervisionTable.vue, EntrustBuildingTable.vue, SelectDialog.vue, detalhes de entrust-sale, detalhes de jgxm de supervisão, entrust-sale-helpers.js, spec e2e

## Verificação e atribuição
- Verificação: src=苏州市房地产监测V3/174.md
- Sessão de origem: 1c6ebe99-e7de-4325-94b6-5e285bed7910; baseline de código: none


<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "select_building_mapping",
  "source_extraction_id": "3815f0545ae74fae8287a1e94503770d",
  "version": 1,
  "memory_type": "entities"
}
-->