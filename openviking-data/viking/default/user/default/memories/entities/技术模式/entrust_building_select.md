# 委托代售楼幢选择公共弹窗改造
苏州市房地产监测V3 委托代售「选择楼幢」已改为公共 `SelectDialog.open`（`zs-select-dialog`），与测绘变更等预售模块一致。

## 变更摘要
- 新增 `entrustSaleConstants.js`：`buildEntrustSaleBuildingSelectDialogOptions(projectId)`
- 接口 `POST /presale/entrustSaleBuilding/selectBuilding`、`noPagination` + `stripPaginationParams`（仅传 `projectId`）、多选、列与原先私有弹窗一致
- 保留 E2E 用 `dialogTestId` / `confirmTestId`
- 改造 `EntrustBuildingTable.vue`：`openSelectDialog` 调用 `SelectDialog.open(...).then(...)`

## 涉及文件
- zhi2-web-admin/src/views/presale/entrustSale/entrustSaleConstants.js
- zhi2-web-admin/src/views/presale/entrustSale/components/EntrustBuildingTable.vue
- SelectBuildingDialog.vue
- zhi2-web-admin/e2e/fixtures/entrust-sale-helpers.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：a0a69d61-f390-4745-a03b-d19b25e490af
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_building_select",
  "source_extraction_id": "c72fc439f52742fe91d274aac0ac08bc",
  "version": 1,
  "memory_type": "entities"
}
-->