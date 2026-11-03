# 楼幢号优先展示buildingNo回退buildingCode
苏州市房地产监测V3 预售与现售模块楼幢号列及文案优先展示 `buildingNo`（无则回退 `buildingCode`）。

## 展示规则
- 楼幢号列及文案优先展示 `buildingNo`，无则回退 `buildingCode`
- 涉及 `PresaleSelectBuildingDialog.vue`、`CashsaleDetail.vue` 等组件
- `permitConstants.js` 与 `cashsaleConstants.js` 的 `flatten*` 方法同步映射 `buildingNo`
- 选择楼幢后本地数据补充保存该字段

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/074.md
- 涉及文件：PresaleSelectBuildingDialog.vue、CashsaleDetail.vue、permitConstants.js、PresaleBuildingTable.vue、CashsaleSelectBuildingDialog.vue、PresaleHouseTable.vue、detail.vue、PresaleProgressDialog.vue、SelectBuildingDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：762f7645-68ac-43ea-9ab7-f47dca205482；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildingno_priority",
  "source_extraction_id": "035bf3f5de7f43a499299f8415342812",
  "version": 1,
  "memory_type": "entities"
}
-->