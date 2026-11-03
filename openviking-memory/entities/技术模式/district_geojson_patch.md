# 腾讯行政区划接口缺失区划本地补丁机制
产品2.0 可视化地图按腾讯行政区划接口渲染，缺失开发区/功能区时通过本地补丁目录按市级 adcode 合并只补缺。

## 问题根因
- 腾讯行政区划返回的苏州市下级区划不含苏州工业园区（320571，国家级开发区，非标准区县节点），接口 GeoJSON 天然缺失
- 业务数据含「工业园区」但地图上无对应多边形

## 修复做法
- 从历史 GeoJSON（transaction/screen/components/suzhou.json）提取缺失区划轮廓，存为 `src/utils/districtMapSupplements/<市级adcode>.json`（如 320500.json）
- tencentDistrictBoundary.js 增加 mergeGeoJsonSupplements(geoJson, adcode)：拉取腾讯数据后按 adcode 自动合并本地补丁，只补缺、不覆盖已有区县
- 其他城市出现开发区/功能区缺失，同样往 districtMapSupplements/ 加对应市级 adcode 补丁文件，通用机制已内建

## 验证与归属
- 验证证据：tencentDistrictBoundary.js 新增 mergeGeoJsonSupplements 并在 loadPlatformDistrictMapGeoJson 中合并；补丁数据来自 transaction/screen/components/suzhou.json
- 涉及文件：utils/tencentDistrictBoundary.js、utils/districtMapSupplements/320500.json、benefit/mapOverview/index.vue
- 所属项目：产品2.0；来源会话：f1c849f4-3cc5-4b13-8600-6f3cd3f51e32；代码基线：50767de

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "district_geojson_patch",
  "source_extraction_id": "0484b9296d2e4e3da6a631e0d03fa14f",
  "version": 1,
  "memory_type": "entities"
}
-->