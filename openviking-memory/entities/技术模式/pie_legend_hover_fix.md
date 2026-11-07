# 饼图扇区hover联动图例高亮
园区物管2.0 中 ECharts 饼图扇区 hover 时手动更新图例 data 实现高亮放大文字。

## 问题根因
- ECharts `legend.emphasis` 仅在鼠标直接悬停图例时生效，扇区 hover 触发的 `highlight` 不会自动放大图例文字
- 原仅靠 `dispatchAction` + `legend.emphasis`，图例视觉几乎无变化

## 修复方案
- 新增公共方法 `pieLegendHover.js`，扇区 hover 时手动更新图例 data
- 当前项：文字放大、加粗、颜色加深；其余项：透明度降至 35%
- 监听 `mouseover`/`highlight`/`mouseout`/`globalout`，兼容单行与多行图例
- 资产全景、资金全景两页面均已接入该工具方法

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：cursor 会话 fc8ed852 提取，问题已修复
- 涉及文件：pieLegendHover.js、benefit/dataSandbox/assetPanorama/index.vue、benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：fc8ed852-b9d6-4d0f-bba8-17f9b9edb32f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_legend_hover_fix",
  "source_extraction_id": "ac80b5d8fa304846a9b0db0e9fb8bf49",
  "version": 1,
  "memory_type": "entities"
}
-->