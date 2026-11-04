# Bug de cancelamento total desligado por cache assíncrona
Cancelar a seleção total de edifícios não sincronizava com a tabela de edifícios por falta de atualização síncrona da cache.

## 问题
- Cancelar tudo saltava casas com exist==1 e buildingCheckCache atualizava assincronamente.
- Checkbox esquerdo e tabela de edifícios direita ficavam dessincronizados.

## 解决方案
- decisionRangeBuildingSelectMixins.js: applyCheckedToAllBuildings define checked='0' uniformemente.
- refreshBuildingCheckCache passa a síncrono e ganha buildingSelectRevision para disparar o refresco.
- syncSelectionViews sincroniza as vistas em lote.

## 验证与归属
- 验证证据: cursor session c29b0f5b-9525-4f3a-8736-42c569de1575
- Ficheiros: zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue, zhi2-web-admin/src/views/autonomy/mixins/decisionRangeBuildingSelectMixins.js, zhi2-web-admin/src/views/autonomy/multiply/components/DecisionRangeTable.vue, zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue, zhi2-web-admin/src/views/autonomy/option/components/VoteRangeDialog.vue, zhi2-web-admin/src/views/maintenance/facilityDefinition/index.vue, zhi2-web-admin/src/views/components/BuildingTable.vue, zhi2-web-admin/src/views/autonomy/repair/components/DecisionRangeTable.vue
- 所属项目: 惠山二期G

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Huishan Fase 2G",
  "name": "uncheck_cache_bug",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "entities"
}
-->