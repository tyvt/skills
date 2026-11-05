# mapOverview 使用公共行政区划顺序
苏住房G(zhi2-web-admin) 已实现 mapOverview 改用公共行政区划数据顺序，新增 platformRegionOrder.js 并改造 initMap。

## 改动内容
- 新增 src/utils/platformRegionOrder.js，与 zs-region-select / area mixin 相同，在 common.areas 中查找平台 adcode
- 市级取 children 的 label(regionName)，区县级取单节点
- mergeDistrictNameOrder 先系统顺序，再追加 GeoJSON 独有区县（如工业园区补丁）
- ensureCommonAreasLoaded 在树为空时 dispatch('common/saveAreaInfo')
- mapOverview/index.vue 的 initMap 拉取腾讯轮廓后用系统树覆盖 mapDistrictNames
- 树解析失败时 console.warn 并回退腾讯

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/utils/platformRegionOrder.js、mapOverview/index.vue、dataHelpers.js、index.vue
- 来源会话ID：d8eff124-05f5-4bb2-a56a-3952313a5c4d

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "mapoverview_region_order",
  "source_extraction_id": "ed95a44e919c4b86bd75d9544ebd9b29",
  "version": 1,
  "memory_type": "entities"
}
-->