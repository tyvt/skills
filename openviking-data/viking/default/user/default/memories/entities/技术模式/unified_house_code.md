# 统一编码列误取房屋编号致显示异常
根因 `houseCode` 为房屋编号，统一房屋编码列误取致显示错误，需新增解析函数优先取统一编码。

## 问题根因
- `houseCode` 为房屋编号，统一房屋编码列取 `houseCode ?? unifiedBuildingCode` 致显示错误。

## 解决方案
- `houseLimitConstants.js` 新增 `resolveUnifiedHouseCode()` 用于 `normalizeHouseLimitLineRow`。
- `limitFormMixin.js` 的 `normalizeCancelHouseRow` 回显与 `mapHouseToLimitLine`/`mapHouseToRemovalLine` 保存映射同步优先 `unifiedHouseCode`/`unifiedBuildingCode`。
- 查看弹窗 UI 混乱一并修正，存量误存数据需后端刷数。

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/023.md
- 涉及文件：LimitRecordDetailDialog.vue、limitCancel.vue、limitFormMixin.js、houseLimitConstants.js、HouseSelectDialog.vue、buildinginfo/detail.vue、house/index.vue、SurveyChangeHouseTable.vue
- 所属项目：苏州市房地产监测V3；来源会话：07483970-f530-4552-ae4c-66e1d899da34；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_house_code",
  "source_extraction_id": "393ff4b197654fe9a049ff3d076ab662",
  "version": 2,
  "memory_type": "entities"
}
-->