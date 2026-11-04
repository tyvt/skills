# Padrão de seleção total de edifícios via mixin e slot
A seleção total ou cancelamento de edifícios para escolha de casas usa mixin e slot tree-actions.

## Implementação
- zs-select-dialog.vue ganha slot tree-actions para apresentar botões de ação.
- decisionRangeBuildingSelectMixins.js faz selecionar/cancelar tudo percorrendo casas com exist!=1 e preservando seleções.
- collectSelectedHousesFromTree agrega e exclui exist==1.
- buildingSelectRevision atualiza o texto das ações.

## 验证与归属
- 验证证据: cursor session ce7dea61-1961-4abb-adbd-9512add57f6a
- Ficheiros: zhi2-web-admin/package.json, zhi2-web-admin/src/views/autonomy/multiply/detail.vue, zhi2-web-admin/src/views/autonomy/multiply/components/DecisionRangeTable.vue, zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue, zhi2-web-admin/src/components/zs-select-dialog/SKILL.md, zhi2-web-admin/src/views/autonomy/preparatoryApply/components/preparatoryRangeTable.vue, zhi2-web-admin/src/views/components/BuildingTable.vue, zhi2-web-admin/src/views/building/unit/components/BuildingTableDialog.vue
- 所属项目: 惠山二期G

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Huishan Fase 2G",
  "name": "building_select_pattern",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "entities"
}
-->