# 地图概览图表 xAxis/yAxis 配置混写修复
园区物管2.0 地图概览页 chartOptions.js 曾误把 yAxis 配置混进 xAxis 且缺少逗号，导致语法错误。

## 根因
- 上次修改时误把 yAxis 的配置混进了 xAxis，且缺少逗号，导致语法错误，路由无法加载。

## 修复方案
- 将 xAxis 和 yAxis 恢复为独立配置，刷新页面后路由正常加载。

## 验证与归属
- 验证：恢复独立配置后路由正常加载。
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js、mock.js、index.vue
- 所属项目：园区物管2.0；来源会话：54b299a4-635f-450d-90d0-0fb23196a9f4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mapoverview_axis_config",
  "source_extraction_id": "2074bf66f64b451aa5c966c53659c840",
  "version": 1,
  "memory_type": "entities"
}
-->