# zs-table-column 自定义列插槽误用 {row} 致报错
苏州市房地产监测V3 中 PresaleHouseTable 等组件误用 slot-scope="{ row }" 致 row 为 undefined，须改用 {scope} 经 scope.row 访问。

## 问题根因
- zs-table-column 自定义列插槽实际传递 {scope} 而非 {row}
- PresaleHouseTable.vue 4 个自定义列插槽误用 slot-scope='{ row }' 致 row 为 undefined
- PermitHistoryPanel.vue、PermitEntrustPanel.vue 与 PermitPlanPanel.vue 存在同类误用

## 解决方案
- PresaleHouseTable.vue 的 4 个自定义列插槽改为 {scope} 并通 scope.row 访问
- PermitHistoryPanel.vue 与 PermitEntrustPanel.vue 同法修正
- PresaleSelectBuildingDialog.vue 的「监管标准」「初始监管额度」列模板改为 `<template slot-scope="{ scope }">{{ scope.row.superviseStandard || '-' }}</template>` 以正常渲染

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/069.md；src=苏州市房地产监测V3-rest/009.md
- 涉及文件：PresaleHouseTable.vue、permitConstants.js、zs-table-column.vue、PresaleBuildingSection.vue、zs-table.vue、PresaleBuildingTable.vue、zs-table-column/zs-table-column.vue、PresaleSelectBuildingDialog.vue、PermitPlanPanel.vue、package.json、ruoyi.js、presale-permit-helpers.js、detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：050cc8e9-9258-449c-ade4-f02145919718、71d310c7-e8fd-4626-846a-719d1e85dcb3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_column_slot_row",
  "source_extraction_id": "eb40dec2781a45a9a11c09c062168035",
  "version": 2,
  "memory_type": "entities"
}
-->