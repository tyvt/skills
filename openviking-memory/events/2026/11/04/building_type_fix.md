# Summary
On 2026-11-04, the building type display bug was fixed: `buildType` returning code `4` previously used the non-standard `BUILDING_TYPE` dict, causing `dictFormatter` to fail. Columns in `AveragePriceTable.vue`, `BuildRecordTable.vue`, and `historicalPrice.vue` were changed to `type="dict"` with `dict-url="building_type"`.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】bug
【标题】楼幢类型显编码因字典未配building_type
【内容】`buildType` 返回编码 `4` 时，组件使用 `BUILDING_TYPE` 而非标准 `building_type` 字典致 `dictFormatter` 无法命中。于 `AveragePriceTable.vue`、`BuildRecordTable.vue`、`historicalPrice.vue` 将列改为 `type="dict"` 并指定 `dict-url="building_type"` 完成转换。
【验证证据】extracted source=cursor session=8a65f99f-f4d2-49e6-95b8-be726f98fc46
【涉及文件】d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/PriceTable.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue ; d:/repository/产品2.0/zhi2-web-admin/src/api/pricemng/recordPriceMng.js ; d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/AveragePriceTable.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildRecordTable.vue ; d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js ; d:/repository/产品2.0/zhi2-web-admin/src/views/building/complexSearch/components/rangeTable.vue ; d:/repository/产品2.0/zhi2-web-admin/src/mixins/table.js
【来源会话ID】8a65f99f-f4d2-49e6-95b8-be726f98fc46
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "building_type_fix",
  "goal": "Fix building type dict display",
  "summary": "On 2026-11-04, the building type display bug was fixed: `buildType` returning code `4` previously used the non-standard `BUILDING_TYPE` dict, causing `dictFormatter` to fail. Columns in `AveragePriceTable.vue`, `BuildRecordTable.vue`, and `historicalPrice.vue` were changed to `type=\"dict\"` with `dict-url=\"building_type\"`.",
  "ranges": "14-21",
  "source_extraction_id": "a37ced02215c453b8a84fce285c86860",
  "version": 1,
  "memory_type": "events"
}
-->