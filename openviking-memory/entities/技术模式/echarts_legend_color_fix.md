# ECharts穿屏与图例缺色全局修复
泰兴小程序统计概览与多页 ECharts 图表存在穿屏、图例缺色问题，已按计划全局修复。
## 问题根因
- 小程序 canvas 图例易缺色，饼图尺寸未收敛导致穿屏。
- echarts-uniapp 存在多份 copy 实现不一致。
## 解决方案
- Phase 1 统计概览「设施设备统计」`src/pages/staff/statistics/index.vue`：饼图 `radius` 改 `38%-58%`、`center` 改 `50%, 50%` 并设 `itemStyle.color`；ECharts 内 `legend:{show:false}`，卡片下方用 Vue 渲染彩色圆点+文案；chart 容器加 `overflow:hidden; position:relative`；`.page-content` 底部 padding 改 `120rpx + safe-area`；工单状态饼图同步收敛并补 `legend.itemStyle` 与显式颜色。
- Phase 2 以 staff 版本为基准，将 echarts-uniapp 加固同步到 4 份 copy（含 `src/staff/pages/components/echarts-uniapp/` 等）。
## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages/staff/statistics/index.vue、wx-canvas.js、budget/index.vue、balancePublicity/index.vue、src/staff/pages/components/echarts-uniapp/
- 来源会话ID：c6d78178-9a03-41bb-a8e5-d4a2d7922ab4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_legend_color_fix",
  "source_extraction_id": "77ba704f1a8144e49c493206d2246a53",
  "version": 1,
  "memory_type": "entities"
}
-->