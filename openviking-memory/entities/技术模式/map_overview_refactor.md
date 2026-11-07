# mapOverview 详情页精简重构
园区物管2.0 驾驶舱地图概览页 mapOverview/index.vue 被拆分为多模块，业务逻辑与交互保持不变。

## 拆分结构
- constants.js：常量、资源 URL、Mock 初始状态、地图标签样式
- dataHelpers.js：接口数据解析、区县列表排序、资金趋势聚合
- chartOptions.js：各 ECharts 图表 setOption 配置（柱状/折线/地图）
- index.vue：模板、生命周期、数据请求与页面编排

## 精简点
- index.vue 由 2641 行降至约 1590 行（约减 40%），抽出工具模块约 820 行便于维护
- 地图轮播提示 7 行重复 DOM 改为 mapTipRows + v-for
- 接口加载统一为 loadOverviewStat，去掉 7 套重复 mock/参数/请求模板
- 区县数据复用 buildRegionByNameMap、buildDistrictNameValueList 处理资金余额与区域数量
- 图表 initChart 统一初始化

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：mapOverview/index.vue、constants.js、dataHelpers.js、chartOptions.js
- 所属项目：园区物管2.0；来源会话：c5eed802-2959-479a-9b04-332f3bcf855d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_overview_refactor",
  "source_extraction_id": "d85e0f70ce6148d6a90daec00c580ae6",
  "version": 1,
  "memory_type": "entities"
}
-->