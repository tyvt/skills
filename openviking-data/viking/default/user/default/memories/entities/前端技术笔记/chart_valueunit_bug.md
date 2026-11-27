---
audit_status: valid
last_checked: 2026-11-27T15:12:46+08:00
verdict_note: 园区物管2.0 dataHelpers.js 有 toChartWanAmount/regionAmountRatio，chartRenderers.js 有 valueUnit，饼图单位修复属实
---
# 饼图valueUnit误设致单位错
园区物管2.0 资金全景页解析 regionAmountRatio 时误设 valueUnit 为 %，导致饼图 tooltip 错误追加 %。

## 现象与根因
- 接口解析 regionAmountRatio 时误将 valueUnit 设为 %
- 饼图 tooltip 错误追加 % 单位，显示重复百分比

## 解决方案
- 在 dataHelpers.js 去除 valueUnit，改用 toChartWanAmount 处理万元
- index.vue 不再写入 valueUnit
- tooltip 正确显示「区名 360.43万元 (50.0%)」

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证证据：会话 da8341d1-4c60-4e14-998d-ee6afa53037c
- 涉及文件：src/views/benefit/dataSandbox/fundPanorama/index.vue、chartRenderers.js、dataHelpers.js、mock.js、chartConstants.js
- 所属项目：园区物管2.0；来源会话ID：da8341d1-4c60-4e14-998d-ee6afa53037c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "chart_valueunit_bug",
  "source_extraction_id": "6979dc0db6524b59bb6a0c5f048888aa",
  "version": 1,
  "memory_type": "entities"
}
-->