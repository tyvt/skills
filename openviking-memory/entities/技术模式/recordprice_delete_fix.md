# recordPriceHouse 删除接口参数修复
删除接口 /presale/recordPriceHouse/delete 请求体缺少 priceRecordIds 参数名，已修复。

## 问题根因
- 原 delRecordPriceHouse 直接把 ID 数组作为请求体发送，后端需要 priceRecordIds 参数名

## 修复内容
- 修改 zhi2-web-admin/src/api/pricehouse/recordPriceHouse.js 中 delRecordPriceHouse
- 请求体改为 `{ priceRecordIds: ids }`，ids 为数组化参数
- PriceTable.vue 删除按钮无需改动，继续调用 delRecordPriceHouse(ids)

## 验证与归属
- 验证：刷新页面后删除请求体为 `{"priceRecordIds":[123]}`
- 涉及文件：recordPriceHouse.js、PriceTable.vue
- 所属项目：产品2.0；来源会话：be8bd962-663e-4c4a-8a14-79f95779a579；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recordprice_delete_fix",
  "source_extraction_id": "3ea283b432954418bfe9e179e58be66d",
  "version": 1,
  "memory_type": "entities"
}
-->