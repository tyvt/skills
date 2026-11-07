# ECharts yAxis 配置误混入 xAxis 致语法错误
园区物管2.0 中误将 yAxis 配置混入 xAxis 且缺少逗号，引发语法错误致路由无法加载。

## 问题根因
- chartOptions.js 中 yAxis 配置被误写入 xAxis 对象内，且缺失逗号分隔。
- 语法错误导致对应路由模块加载失败、页面无法访问。

## 解决方案
- 恢复 xAxis 与 yAxis 为相互独立的配置项，补回缺失逗号。
- 页面恢复正常加载。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js、mock.js、index.vue。
- 验证证据：src=园区物管2.0/043.md。
- 所属项目：园区物管2.0；来源会话：54b299a4-635f-450d-90d0-0fb23196a9f4；代码基线：none。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_axis_config_syntax",
  "source_extraction_id": "064aa8abd4864c4c910fd19e1e0dd59b",
  "version": 1,
  "memory_type": "entities"
}
-->
