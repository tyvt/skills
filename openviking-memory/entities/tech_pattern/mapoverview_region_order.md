# mapOverview公共行政区划顺序
苏住房G受益地图mapOverview须采用公共行政区划顺序，新增platformRegionOrder.js从common.areas提取并合并GeoJSON独有区县。
## 解决方案
- 新增utils/platformRegionOrder.js从common.areas提取市/区县顺序
- mergeDistrictNameOrder合并GeoJSON独有区县
- mapOverview/index.vue的initMap拉取腾讯轮廓后用系统树覆盖mapDistrictNames，解析失败warn回退
## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：src=苏住房G/033.md
- 涉及文件：constants.js、index.vue、chartOptions.js、dataHelpers.js、mock.js、wuxiFallback.js、Navbar.vue、area.js
- 来源会话：d8eff124-05f5-4bb2-a56a-3952313a5c4d

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "mapoverview_region_order",
  "source_extraction_id": "9045f3f234e04b8fad54878354d961ab",
  "version": 1,
  "memory_type": "entities"
}
-->