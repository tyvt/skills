# 委托代售楼幢选择复用公共弹窗
预售模块楼幢选择统一为公共 `SelectDialog.open`（`zs-select-dialog`）以消除私有弹窗冗余。

## 修复要点
- 预售模块楼幢选择统一调用公共 `SelectDialog.open`（`zs-select-dialog`）
- 在 `entrustSaleConstants.js` 新增 `buildEntrustSaleBuildingSelectDialogOptions(projectId)` 封装接口与列
- `EntrustBuildingTable.vue` 改造 `openSelectDialog` 调用公共弹窗

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/100.md
- 涉及文件：building.js、entrust-sale-real-api-flow.spec.js、EntrustBuildingTable.vue、entrust-sale-helpers.js、SelectBuildingDialog.vue、surveyChangeConstants.js、zs-select-dialog.vue、zs-select-dialog-func.vue
- 所属项目：苏州市房地产监测V3；来源会话：a0a69d61-f390-4745-a03b-d19b25e490af；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_building_dialog",
  "source_extraction_id": "d1c5eb1d0bfb481683e1d3af56a26208",
  "version": 1,
  "memory_type": "entities"
}
-->