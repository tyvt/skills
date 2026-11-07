# 底部饼图图例每行固定 N 项
园区物管2.0 资金全景底部饼图图例需精确控制「每行 4 个」，用 legend 数组分段 + bottom 错开实现。

## 问题根因
- ECharts 单个 legend 靠宽度自动换行难以精确控制每行个数（如一行 4 个再换行）

## 解决方案
- buildDistrictPieLegendOption 在 legendBottom 为真时，按 districtOrder 切成多段，返回 legend 数组：每段一行、设置不同 bottom 纵向错开
- 可调常量：PIE_LEGEND_ITEMS_PER_ROW（每行个数）、PIE_LEGEND_ROW_STEP（行间距）
- 右侧竖排图例（legendBottom 为假）逻辑保持独立

## 验证与归属
- 验证：会话 1262fc8a 用户要求饼图图例一行 4 个再换行，结论描述 legend 数组与 PIE_LEGEND_ITEMS_PER_ROW/ROW_STEP
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：1262fc8a-c936-4b20-bf86-cc7a75c4f508；代码基线：f00310232

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "fundpanorama_legend_row",
  "source_extraction_id": "6d1260c5d95f40dea1323fb5b5278536",
  "version": 1,
  "memory_type": "entities"
}
-->