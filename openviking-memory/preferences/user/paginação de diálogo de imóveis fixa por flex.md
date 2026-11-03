- A barra de paginação no diálogo de imóveis era cortada por limite de altura de layout. BuildingTableViewTabs.vue mudou min-height da área de tabela para 0 e usou flex:1 com scroll interno; barra de paginação com flex-shrink:0 fixa e padding-bottom:4px.
- zs-select-dialog.vue complementou .dialog-right.building-table-right com display:flex, flex-direction:column, flex:1 para garantir altura do layout direito.
- Arquivos: d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/option/components/DecisionRangeTable.vue; d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingTableViewTabs.vue; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue; d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/option/detail.vue; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/SKILL.md; d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubElevMaintenanceIncome/detail.vue
- Verificação: src=园区公共收益/022.md; sessão e0c9e026-360f-4210-a247-b1f275759fea

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Paginação de diálogo de imóveis fixa por flex",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "preferences"
}
-->