# 房地产市场监测看板图表文字清晰度排查
zhi2-web-admin/src/views/property/marketMonitor/ 看板从 React 参考站移植，ECharts option 逐字照抄；技术栈本地 echarts6 + Tailwind，页面字体 Noto Sans SC/JetBrains Mono（Google Fonts）。

## 根因
- 参考站 EChartBox 不传 fontFamily，Vue 版照抄，画布回退默认 sans-serif，与页面 Noto Sans SC 不一致（设计层问题）。
- 轴标签/图例 color #64748b、fontSize 8.5~11px，灰字+白底+极小字号对比度不足（主因）。
- ScreenAdapter 1920×1080 等比缩放仅放大糊化，非根因。

## 修复（2026-11-09）
- 用户确认全改系统默认字体：删 index.html 第10-13行 Google Fonts 引入。
- dashboard.css --font-sans 改系统栈；灰字 #64748b/#475569 加深 #334155、小字号上调、灰标签 fontWeight:600。
- 独立 worktree fix/marketMonitor-chart-font-clarity 改6面板；他人 zhi2-web-admin-wt-payfund 同批文件不碰。
- 所属项目：zhi2-web-admin 房地产市场数据分析平台；来源 2026-11-09 会话。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "chart_text_clarity",
  "source_extraction_id": "e713b433f93d40d499739887234a2cc4",
  "version": 4,
  "memory_type": "entities"
}
-->