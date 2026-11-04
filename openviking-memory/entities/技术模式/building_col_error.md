# Pop-up de edifício não mostra tipo/local por erro de coluna
O campo retornado pela interface é `position` mas `buildingTable.vue` usou `address`; no render do `SelectDialog`, `zs-table-column.vue` usou `scope.column.type` inconsistente com `$attrs.type`, falhando a coluna de dicionário.

## 问题根因
- O campo retornado pela interface é `position` mas `buildingTable.vue` usou `address`
- No render do `SelectDialog`, `zs-table-column.vue` usou `scope.column.type` inconsistente com `$attrs.type`, falhando a coluna de dicionário

## 解决方案
- Modificar `prop` e `dictUrl` em `buildingTable.vue`
- `zs-table-column.vue` passa a usar `$attrs.type` para julgar o tipo de coluna

## 验证与归属
- Tipo de memória: bug
- 验证证据: src=产品2.0/035.md
- 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/publicQuery/complex/components/buildingTable.vue, src/views/publicQuery/complex/detail.vue, src/components/zs-select-dialog/zs-select-dialog-func.vue, src/views/property/complex/components/rangeTable.vue, src/views/property/complex/components/houseTable.vue, src/components/zs-table-column/zs-table-column.vue, src/views/building/complexSearch/components/houseTable.vue, src/mixins/table.js
- 所属项目: 产品2.0; sessão: dbc7cb9d-a0a8-4e87-8a32-7d0db2961532; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_col_error",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->