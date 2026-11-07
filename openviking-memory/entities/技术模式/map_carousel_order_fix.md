# 地图轮播顺序对齐 mock 数据
园区物管2.0 地图概览页轮播幻灯片原按 GeoJSON 区县序排列，与 mock 数据顺序错位，改为依 regionDistricts 数组顺序构建。

## 问题根因
- 地图轮播原按 `mapDistrictNames`（GeoJSON 区县序）排列，与 `mock.js` 中 `districts` 顺序不一致，导致轮播与图表展示顺序错位

## 解决方案
- `mapCarouselSlides` 改为依 `regionDistricts` 数组顺序构建
- mock 模式下源自 `mock.js` 的 `districts`（无锡市、江阴市→宜兴市→梁溪区→锡山区→惠山区→滨湖区→新吴区），对齐图表展示顺序

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：src=园区物管2.0/054.md
- 涉及文件：mapOverview/mock.js、index.vue、constants.js、chartOptions.js、dataHelpers.js
- 所属项目：园区物管2.0；来源会话：ce480978-d86b-4baf-97de-7a840042ee50

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_carousel_order_fix",
  "source_extraction_id": "846d672223cd445ea22af46f3ef6a218",
  "version": 1,
  "memory_type": "entities"
}
-->