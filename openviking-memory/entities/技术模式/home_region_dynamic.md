# 首页区域筛选动态行政区划（苏住房G）
苏住房G 门户首页 index-v2.vue 的区域筛选从苏州区县硬编码改为动态拉取行政区划。

## 改动文件
- `zhi2-web-admin/src/views/home/index-v2.vue`：删除苏州区县硬编码与 platformConfig.regions 分支，loadRegionOptions() 异步拉取 Tab，regionOptionsFetchSeq 防竞态
- `zhi2-web-admin/src/views/property/largeScreen/utils.js`：新增 mapRegionSortListToTabOptions、fetchCityRegionTabOptions（getCityRegionCode + /system/region/list），导出 CITY_WIDE_TAB_OPTION（「全市」）
- `zhi2-web-admin/src/views/home/preview-main.js`：platformConfig.region 设为 '320500'，$get mock /system/region/list
- `zhi2-web-admin/tests/e2e/home-v2-mocks.js`：E2E 测试 mock 支持

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：extracted source=cursor project=苏住房G；来源会话ID ce428e8e-b7cf-41be-97cd-31a190c4c9fb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_region_dynamic",
  "source_extraction_id": "b2f3d9a5d671411b9686578f48730eea",
  "version": 1,
  "memory_type": "entities"
}
-->