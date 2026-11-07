# 楼幢号展示改用buildingNo
苏州市房地产监测V3 完成「楼幢号」展示统一改用 `buildingNo`（无则回退 `buildingCode`），预售许可与现售备案模块同步对齐。

## 预售许可模块
- `PresaleSelectBuildingDialog.vue`、`PresaleBuildingTable.vue`、`detail.vue`、`PresaleHouseTable.vue`、`PresaleProgressDialog.vue`：楼幢号列、标题、勾选/确认文案优先展示 `buildingNo`
- `permitConstants.js`：`flattenPresaleHouses` 同步映射 `buildingNo`

## 现售备案模块
- `CashsaleSelectBuildingDialog.vue`：与预售弹窗相同调整
- `cashsaleConstants.js`：`flattenCashsaleHouses` 同步映射 `buildingNo`
- `CashsaleDetail.vue`：选择楼幢后补充保存 `buildingNo`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：762f7645-68ac-43ea-9ab7-f47dca205482
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_no_display",
  "source_extraction_id": "2fc661addc014e93b50dd3ca11d84086",
  "version": 1,
  "memory_type": "entities"
}
-->