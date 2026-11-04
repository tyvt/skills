# 监管楼盘字段映射规范化
在苏州房地产监测V3的预售监管模块中，`SupervisionTable.vue` 中的楼盘接口已被 `/building/building/selectBuilding` 替换，且 prop 列从 `constructionNo` 变更为 `buildingNo`。

## 修正点
- `SupervisionTable.vue` 将楼盘接口替换为 `/building/building/selectBuilding`
- prop 列从 `constructionNo` 变更为 `buildingNo`
- `setData` 遍历实际选中的行，兼容旧的字段映射 `buildingNo`/`buildingArea`

## 涉及文件
- SelectBuildingDialog.vue, SupervisionTable.vue, EntrustBuildingTable.vue, SelectDialog.vue, entrust-sale 详情, 监管 jgxm 详情, entrust-sale-helpers.js, spec e2e

## 验证与归属
- 验证: src=苏州市房地产监测V3/174.md
- 源会话: 1c6ebe99-e7de-4325-94b6-5e285bed7910; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_building_mapping",
  "source_extraction_id": "3815f0545ae74fae8287a1e94503770d",
  "version": 1,
  "memory_type": "entities"
}
-->