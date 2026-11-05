# 苏州工业园区地图补丁
产品2.0 可视化中苏州工业园区在左侧轮播能显示，但地图 GeoJSON 无对应多边形，已从历史 GeoJSON 提取补丁并在地图加载时自动补缺。

## 问题根因
- 腾讯行政区划接口返回的苏州市下级区划里不包含苏州工业园区（`320571`，国家级开发区，不是标准区县节点）
- 业务接口的行政划分数据里有「工业园区」，所以左侧轮播能显示，地图 GeoJSON 却没有对应多边形

## 修复方案
- 从历史 GeoJSON（`transaction/screen/components/suzhou.json`）提取「工业园区」轮廓，保存为 `zhi2-web-admin/src/utils/districtMapSupplements/320500.json`
- 修改 `tencentDistrictBoundary.js`，在 `loadPlatformDistrictMapGeoJson` 拉取腾讯数据后，对苏州市（`320500`）自动合并本地补丁，只补缺、不覆盖已有区县

## 涉及文件与归属
- 涉及文件：`transaction/screen/components/suzhou.json`、`zhi2-web-admin/src/utils/districtMapSupplements/320500.js`、`tencentDistrictBoundary.js`
- 所属项目：产品2.0；来源会话：f1c849f4-3cc5-4b13-8600-6f3cd3f51e32；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "suzhou_map_patch",
  "source_extraction_id": "a0aa551040bb463183a5bf54308c95b5",
  "version": 1,
  "memory_type": "entities"
}
-->