# Slot de coluna customizado não pode desestruturar row
No projeto 苏州市房地产监测V3, o `zs-table-column` passa `{ scope }` e não `{ row }`; componentes como `PresaleHouseTable.vue` e `PresaleBuildingTable.vue` usavam `slot-scope='{ row }'` causando `row` undefined.

## 问题根因
- `zs-table-column` passa `{ scope }` em vez de `{ row }` no slot customizado
- `PresaleHouseTable.vue` usava `slot-scope='{ row }'` em 4 colunas customizadas, fazendo `row` ser `undefined`
- `PresaleBuildingTable.vue` desestruturava `{ row }` e obtinha `undefined`, gerando erro de acesso a propriedade
- `PermitHistoryPanel.vue`, `PermitEntrustPanel.vue` e `PermitPlanPanel.vue` tinham uso incorreto similar

## 解决方案
- 4 slots de coluna em `PresaleHouseTable.vue` mudaram para `{ scope }` e acessam via `scope.row`
- `PresaleBuildingTable.vue` teve o slot alterado para `{ scope }` com acesso por `scope.row`
- `PermitHistoryPanel.vue` e `PermitEntrustPanel.vue` ajustados da mesma forma
- `PresaleSelectBuildingDialog.vue` usou `<template slot-scope="{ scope }">{{ scope.row.superviseStandard || '-' }}</template>`
- `companyChangeManage/index.vue` e `toB/companyRecord/detail.vue` passaram a usar o `formatter` da coluna para renderizar o tipo de mudança e proteger `row` vazio no método (sessão 239bd34d-1fce-4cc6-aba4-e5be4ee5ce9f)

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3/269.md; src=苏州市房地产监测V3-leftover/069.md; src=苏州市房地产监测V3-rest/009.md; src=苏州市房地产监测V3/058.md
- Sessões: 050cc8e9-9258-449c-ade4-f02145919718; 71d310c7-e8fd-4626-846a-719d1e85dcb3; 848529ca-dbef-4317-ac0a-f071aba151fb; 239bd34d-1fce-4cc6-aba4-e5be4ee5ce9f
- 涉及文件: PresaleHouseTable.vue, PresaleBuildingTable.vue, permitConstants.js, zs-table-column.vue, PresaleBuildingSection.vue, zs-table.vue, zs-table-column/zs-table-column.vue, PresaleSelectBuildingDialog.vue, PermitHistoryPanel.vue, PermitEntrustPanel.vue, PermitPlanPanel.vue, package.json, ruoyi.js, presale-permit-helpers.js, detail.vue, companyChangeManage/index.vue, toB/companyRecord/detail.vue
- 所属项目: 苏州市房地产监测V3; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "column_slot_fix",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 3,
  "memory_type": "entities"
}
-->