# 监管楼栋接口URL与字段映射新规范
苏州市房地产监测V3 中废弃旧监管楼栋接口并按新规范映射 URL 与返回字段。

## 变更要点
- 旧接口 `/building/buildinginfo/selectBuilding` 废弃
- 返回字段 `constructionNo`/`floorArea` 更名为 `buildingNo`/`buildingArea`

## 修复方案
- `SupervisionTable.vue` 更新接口 URL 及楼幢号列 `prop`
- 修正 `setData` 遍历实际选中 `row` 以兼容新旧字段映射

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/130.md
- 涉及文件：SelectBuildingDialog.vue、SupervisionTable.vue、EntrustBuildingTable.vue、SelectDialog.vue、entrustSale/detail.vue、jgxm/detail.vue、entrust-sale-helpers.js、entrust-sale-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：1c6ebe99-e7de-4325-94b6-5e285bed7910；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_api_field_map",
  "source_extraction_id": "09055bdcd2ed47b8927899ce1b85cc24",
  "version": 1,
  "memory_type": "entities"
}
-->