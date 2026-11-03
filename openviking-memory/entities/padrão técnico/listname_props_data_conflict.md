# listName declarado em props e data simultaneamente gera aviso Vue
No projeto Suzhou Real Estate Monitoring V3 (zhi2-web-admin), o mixin `table.js` definiu `listName` em `data()` enquanto componentes como `PlanLicRelatedBuildingTable.vue` o declararam como prop, violando a proibição do Vue de coabitação do mesmo atributo.

## Causa raiz
- O mixin `table.js` definiu `listName` em `data()`
- Componentes como `PlanLicRelatedBuildingTable.vue` o declararam como prop
- O Vue proíbe o mesmo atributo em props e data simultaneamente, gerando aviso

## Solução
- Renomeado o prop de campo de submissão de API para `submitDataKey`
- Modificado o binding `list-name` em `ConsLicBuildTable.vue` e `changeDetail.vue` para usar o novo nome

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-leftover/084.md
- Arquivos: PlanLicRelatedBuildingTable.vue, subTableMixins.js, table.js, ListTemplate.js, ConsLicBuildTable.vue, planLic/detail.vue, planLic/changeDetail.vue, consLic/changeDetail.vue
- Projeto: Suzhou Real Estate Monitoring V3; sessão: 55d7d7d9-e5d7-412b-9318-c88e962e77f3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "listname_props_data_conflict",
  "source_extraction_id": "0ec9de86592745d2954137491ac6674b",
  "version": 1,
  "memory_type": "entities"
}
-->