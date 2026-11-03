# 超大地图图表页面四件套拆分
园区物管2.0 超大地图/图表页面按 constants / dataHelpers / chartOptions / index.vue 四件套拆分精简，逻辑不变。

## 问题根因
- mapOverview/index.vue 膨胀到 2641 行（7 套重复接口加载模板、地图轮播 DOM、多个 ECharts 图配置）
- 单文件把常量、数据解析、图表配置、页面编排混在一起，重复模板是行数膨胀主因

## 解决方案
- constants.js：常量/资源 URL/mock 开关/CSS 变量配置表
- dataHelpers.js：接口数据解析、区县排序、聚合
- chartOptions.js：各图表 setOption 构建函数
- index.vue：只留模板/生命周期/请求编排；重复代码用 map+v-for、统一 loadOverviewStat、buildXxx 复用函数收敛
- CSS 变量注入用 MAP_OVERVIEW_CSS_VARS 配置表替代逐项 setProperty；拆分后人工过一遍筛选/轮播/图表刷新等交互验证逻辑等价

## 验证与归属
- 验证：用户仅要求「精简代码，保持逻辑不变」，结论给出四文件职责表与 8 条等价精简点；2641→1590 行（约 -40%）
- 涉及文件：src/views/benefit/mapOverview/index.vue、constants.js、dataHelpers.js、chartOptions.js
- 所属项目：园区物管2.0；代码基线：6a4835a08；来源会话：c5eed802-2959-479a-9b04-332f3bcf855d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "four_module_split",
  "source_extraction_id": "53246eca93fe4b4fb7a3b7d493699f83",
  "version": 1,
  "memory_type": "entities"
}
-->