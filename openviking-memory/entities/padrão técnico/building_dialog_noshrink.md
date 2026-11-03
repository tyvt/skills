# building_dialog_noshrink
Tabela de prédios em diálogo sofria compressão flex causando rótulos verticais; necessário proibir compressão e scroll horizontal.

## Causa raiz
- Tabela de prédios dentro de diálogo sofria compressão flex, deixando rótulos verticais e achatados

## Solução
- Em BuildingTable.vue, .floor-label e .unit-label recebem flex-shrink:0 e white-space:nowrap
- room-cell com min-width; .table-header e .floor-row com flex-wrap:nowrap
- RangeTable.vue ativa building-table-mode, cell-width="120" e container .building-table-wrapper com scroll horizontal

## Arquivos envolvidos
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/facility/components/RangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/facility/components/RangeHouseTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/components/BuildingTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubElevMaintenanceIncome/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue

## Verificação
- Prova: src=园区公共收益/022.md
- Sessão de origem: f5c910bd-d8dd-4878-952a-b6286f9f507f; base de código: none
- Projeto: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "building_dialog_noshrink",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "entities"
}
-->