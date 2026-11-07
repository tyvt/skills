# 饼图金额单位误加百分号
园区物管2.0 fundPanorama 各区收入/支出分布图 tooltip 误把万元金额后加 %，与页面万元单位冲突。

## 问题根因
- dataHelpers.js 解析 regionAmountRatio 时误将 valueUnit 设为 %。
- 饼图 tooltip 在 valueUnit === '%' 时写成「数值% (占比%)」，但页面与接口金额均为万元。

## 解决方案
- dataHelpers.js 去掉 valueUnit: '%'，数值按万元用 toChartWanAmount 处理（与其它金额字段一致）。
- index.vue 更新饼图数据时不再写入 valueUnit。
- tooltip 显示为「区名 + 360.43 万元 (50.0%)」格式，前为金额后为占比。

## 涉及信息
- 涉及文件：benefit/dataSandbox/fundPanorama/index.vue、chartRenderers.js、dataHelpers.js
- 所属项目：园区物管2.0；来源会话：da8341d1-4c60-4e14-998d-ee6afa53037c；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "chart_value_unit_wan",
  "source_extraction_id": "42c768a81b7349ffb7ae96dc2517af73",
  "version": 1,
  "memory_type": "entities"
}
-->
