# zs-table-column slot-scope解构批量修复
苏州市房地产监测V3 项目 zhi2-web-admin 中 zs-table-column 下 slot-scope="scope" 误用导致行数据取不到，批量修复 20 个文件 25 处同类缺陷。

## 问题根因
- zs-table-column 向插槽传递的是 `{ scope }`（见 zs-table-column.vue `<slot :scope="scope">`），消费方必须解构为 `{ scope }` 并用 `scope.row` 取行数据；误用 `{ row }` 或 `slot-scope="scope"` 均会导致 row 为 undefined
- 原生 el-table-column（如 PricingModeTable.vue 操作列）不受影响，一律不动

## 修复清单
- 合同模块：CommercialHousingTable、MortgageEntitiesTable.vue（操作列 查看/编辑/删除）
- 楼栋/楼盘表：buildingTable/index.vue（全部单元格）、MoneyInformation.vue、PresaleSelectBuildingDialog.vue（「监管标准」「初始监管额度」列，doLayout 重渲染后暴露 row 取不到报错）
- 资金监管：RelatedBuildingsTable.vue、AppropriateTable.vue（计划节点日期选择）、ExpenseTable.vue
- 预售模块：PresaleBuildingTable.vue（工程形象进度、预售套数/预售总面积、监管标准/初始监管额度、操作列）、PermitHistoryPanel.vue、PermitEntrustPanel.vue（后两者用 { row } 解构，打开对应 Tab 时可能仍取不到 row，待验证）
- 逐处用标签栈判定外层确为 zs-table-column 才改

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 全量复查通过，共 20 个文件 25 处同类缺陷
- 所属项目：苏州市房地产监测V3；来源会话：609a8f76-e371-401d-92fa-3592fbd4cbd8、848529ca-dbef-4317-ac0a-f071aba151fb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_slot_fix",
  "source_extraction_id": "28abe140eda94388b87f73b3086a18be",
  "version": 3,
  "memory_type": "entities"
}
-->