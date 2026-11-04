# zs-table-column slot-scope解构批量修复
苏州市房地产监测V3 项目 zhi2-web-admin 中 zs-table-column 下 slot-scope="scope" 误用导致行数据取不到，批量修复 20 个文件 25 处同类缺陷。

## 问题根因
- zs-table-column 下 slot-scope="scope" 应改为 slot-scope="{ scope }"，解构后 scope.row 才是行数据
- 原生 el-table-column（如 PricingModeTable.vue 操作列）不受影响，一律不动

## 修复清单
- 合同模块：CommercialHousingTable、MortgageEntitiesTable.vue（操作列 查看/编辑/删除）
- 楼栋/楼盘表：buildingTable/index.vue（全部单元格）、MoneyInformation.vue
- 资金监管：RelatedBuildingsTable.vue、AppropriateTable.vue（计划节点日期选择）、ExpenseTable.vue
- 逐处用标签栈判定外层确为 zs-table-column 才改

## 验证与归属
- 全量复查通过，共 20 个文件 25 处同类缺陷
- 所属项目：苏州市房地产监测V3；来源会话：609a8f76-e371-401d-92fa-3592fbd4cbd8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_slot_fix",
  "source_extraction_id": "97e9acda86194a2a9a55d80bc7b40fe0",
  "version": 1,
  "memory_type": "entities"
}
-->