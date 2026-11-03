# mapOverview ECharts GeoJSON Basemap
In the zhi2-web-admin project's mapOverview page, the administrative division map basemap uses ECharts administrative GeoJSON instead of the Tencent GL component.

## Description
- The administrative division basemap in the data visualization page mapOverview is rendered with ECharts administrative district GeoJSON, not the Tencent GL map component.
- Outline boundary data is fetched from Tencent Location Service WebService administrative division API (district/v1/search and getchildren).
- Parallel initialization calls for the boundary data are handled in tencentDistrictBoundary.

## Data Source
- Tencent WebService API endpoints apis.map.qq.com/ws/district/v1/search and getchildren supply the GeoJSON outline data.
- This follows the project's established pattern of using JSONP/direct WebService calls for district boundaries.

## Related Files
- zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js
- zhi2-web-admin/src/utils/tencentDistrictBoundary.js
- zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js
- zhi2-web-admin/src/utils/tencentMapKey.js

## Provenance
- Source session: cddb6eee-4c9a-4c3f-9de6-1a21655f7967 (cursor extraction).
- Project: zhi2-web-admin (Wuxi urban area G / Campus Property Management 2.0).

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "mapoverview_echarts_geojson",
  "source_extraction_id": "e9f93b8e8026419c88d098fd3012464e",
  "version": 1,
  "memory_type": "entities"
}
-->