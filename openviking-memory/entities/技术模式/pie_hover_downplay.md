# 环形图鼠标移出取消高亮与放大
园区物管2.0 资金全景页饼图在鼠标移出后未取消高亮与扇区放大，修复于共享模块 pieLegendHover.js。

## 问题根因
- 饼图交互由 renderDistrictPie 经 bindPieLegendHover 绑定，逻辑在共享模块 pieLegendHover.js 而非 index.vue
- mouseover 时手动 dispatchAction highlight 触发扇区放大（PIE_SERIES_EMPHASIS 的 scale:true）
- mouseout 仅重置图例样式，未调用 downplay，高亮与放大一直保持

## 解决方案
- 在 mouseout 与 globalout 时调用 dispatchAction({ type: 'downplay' }) 恢复默认
- 同步将图例重置为默认状态

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/pieLegendHover.js、fundPanorama/index.vue、fundPanorama/chartRenderers.js
- 所属项目：园区物管2.0；来源会话：1ffbe0a9-01c9-4c6e-8964-74902067048b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_hover_downplay",
  "source_extraction_id": "acb15736125a47a1b2244a5bd49d708c",
  "version": 1,
  "memory_type": "entities"
}
-->