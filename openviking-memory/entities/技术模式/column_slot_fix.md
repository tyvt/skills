# 自定义列插槽无法解构 row
在 苏州市房地产监测V3 项目中，`zs-table-column` 传递的是 `{ scope }` 而不是 `{ row }`；诸如 `PresaleHouseTable.vue` 和 `PresaleBuildingTable.vue` 等组件使用了 `slot-scope='{ row }'`，导致 `row` 为 undefined。

## 问题根因
- `zs-table-column` 在自定义插槽中传递的是 `{ scope }` 而非 `{ row }`
- `PresaleHouseTable.vue` 在 4 个自定义列中使用了 `slot-scope='{ row }'`，导致 `row` 为 `undefined`
- `PresaleBuildingTable.vue` 解构了 `{ row }` 并得到 `undefined`，从而引发属性访问错误
- `PermitHistoryPanel.vue`、`PermitEntrustPanel.vue` 和 `PermitPlanPanel.vue` 存在类似的不正确用法

## 解决方案
- `PresaleHouseTable.vue` 中的 4 个列插槽改为 `{ scope }` 并通过 `scope.row` 访问
- `PresaleBuildingTable.vue` 的插槽改为 `{ scope }` 并通过 `scope.row` 访问
- `PermitHistoryPanel.vue` 和 `PermitEntrustPanel.vue` 做了同样的调整
- `PresaleSelectBuildingDialog.vue` 使用了 `<template slot-scope="{ scope }">{{ scope.row.superviseStandard || '-' }}</template>`
- `companyChangeManage/index.vue` 和 `toB/companyRecord/detail.vue` 开始使用该列的 `formatter` 来渲染变更类型，并在方法中保护空的 `row`（会话 239bd34d-1fce-4cc6-aba4-e5be4ee5ce9f）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：239bd34d-1fce-4cc6-aba4-e5be4ee5ce9f
- 验证证据: src=苏州市房地产监测V3/269.md; src=苏州市房地产监测V3-leftover/069.md; src=苏州市房地产监测V3-rest/009.md; src=苏州市房地产监测V3/058.md
- 会话: 050cc8e9-9258-449c-ade4-f02145919718; 71d310c7-e8fd-4626-846a-719d1e85dcb3; 848529ca-dbef-4317-ac0a-f071aba151fb; 239bd34d-1fce-4cc6-aba4-e5be4ee5ce9f
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