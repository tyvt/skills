# ECharts饼图hover高亮不消失
园区物管2.0 中 ECharts 饼图手动 dispatchAction highlight 后必须配 downplay 成对，否则 mouseout 后扇区保持放大不恢复。

## 问题根因
- ECharts 饼图实现「图例/扇区 hover 联动高亮放大」，鼠标移出后扇区仍保持放大高亮不恢复
- 共享模块 pieLegendHover.js 在 mouseover 时用 dispatchAction({type:'highlight'}) 触发 emphasis（PIE_SERIES_EMPHASIS scale:true）
- mouseout/globalout 只重置了图例 DOM 样式，没有派发 downplay，ECharts 内部的 emphasis 状态不会被图表外部样式操作还原

## 解决方案
- 手动 dispatchAction highlight 与 downplay 必须成对出现：mouseout（按 seriesType==='pie' 且带 seriesIndex/name）和 globalout（无条件清全部）里调 dispatchAction({type:'downplay'})，同时把图例恢复默认态
- 该逻辑收敛在共享的 pieLegendHover 模块，多个页面的饼图/环形图共用，一处修全局生效
- 写任何「手动 dispatchAction 交互增强」时都按此对称原则自查

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：pieLegendHover.js 增加 resetPieHover 在 mouseout/globalout 派发 downplay 并恢复图例
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/pieLegendHover.js、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：已知图表类条目为裁剪包缺 series(#1)、markRaw(#4)、type=2d 同层渲染(#40)、穿屏与图例缺色(#47)、原生叠加层(#38)，无「highlight 后必须 downplay」条目；来源会话：1ffbe0a9-01c9-4c6e-8964-74902067048b

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "echarts_pie_downplay",
  "source_extraction_id": "21155a3ba2ee488fb8dc6fd1a92e34f7",
  "version": 1,
  "memory_type": "entities"
}
-->