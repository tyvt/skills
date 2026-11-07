# Summary
On 2026-11-04, the delete API `/presale/recordPriceHouse/delete` was fixed: `delRecordPriceHouse` was changed to send request body `data: { priceRecordIds: ids }` instead of a direct ID array, because the backend requires the `priceRecordIds` parameter. The `PriceTable.vue` call remained unchanged.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】pattern
【标题】删除接口请求体须用priceRecordIds
【内容】删除接口`/presale/recordPriceHouse/delete`原直接发送ID数组，后端需`priceRecordIds`参数。`delRecordPriceHouse`改为请求体`data: { priceRecordIds: ids }`，`PriceTable.vue`调用不变。
【验证证据】extracted source=cursor session=be8bd962-663e-4c4a-8a14-79f95779a579
【涉及文件】d:/repository/产品2.0/zhi2-web-admin/src/api/presale/recordPriceHouse.js ; d:/repository/产品2.0/zhi2-web-admin/src/api/pricehouse/recordPriceHouse.js ; d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/PriceTable.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildingsTable.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/salePlan/pricehouse/recordPriceHouse/index.vue ; PriceTable.vue
【来源会话ID】be8bd962-663e-4c4a-8a14-79f95779a579
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "priceRecordIds_fix",
  "goal": "Fix delete API request body",
  "summary": "On 2026-11-04, the delete API `/presale/recordPriceHouse/delete` was fixed: `delRecordPriceHouse` was changed to send request body `data: { priceRecordIds: ids }` instead of a direct ID array, because the backend requires the `priceRecordIds` parameter. The `PriceTable.vue` call remained unchanged.",
  "ranges": "0-5",
  "source_extraction_id": "a37ced02215c453b8a84fce285c86860",
  "version": 1,
  "memory_type": "events"
}
-->