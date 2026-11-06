# 预售方案填报字典与日期控件改造
苏州市房地产监测V3 中预售方案填报页 `PresalePlanFillForm.vue` 完成字典下拉与日期控件改造。

## 改动说明
- `permitConstants.js` 新增字典类型常量 `LAND_MORTGAGE_STATE` → `land_use_rights_mortgage_state`、`COMMERCIAL_HOUSE_SALE_TYPE` → `commercial_house_sale_type`
- 土地使用权抵押状态、销售方式、团购活动下拉改为 `getDicts` 动态加载
- `consentDate`、`facilityDelivery` 日期控件改为 `zs-date-picker`（`yyyy-MM-dd`）
- 代理机构行显示条件由 `saleMode === '2'` 改为 `saleMode === '1'`
- `normalizeSaleMode()` 将旧编码 `1=自行/2=委托` 映射为新字典 `0/1`

## 验证与归属
- 涉及文件：`permitConstants.js`、`PresalePlanFillForm.vue`、`plan/detail.vue`、`PermitPlanPanel.vue`
- 所属项目：苏州市房地产监测V3；来源会话：44a56ca5-f11d-40ff-a9f2-cd4a229a1f75
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_fill_fix",
  "source_extraction_id": "40b6465dd8ab4f0bb97d559feedd42fc",
  "version": 1,
  "memory_type": "entities"
}
-->