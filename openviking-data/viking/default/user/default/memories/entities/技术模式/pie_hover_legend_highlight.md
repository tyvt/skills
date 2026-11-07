# 饼图扇区悬停不触发图例高亮放大
园区物管2.0 饼图扇区 hover 不会自动放大图例文字，因 ECharts legend.emphasis 仅鼠标直接悬停图例生效，新增 pieLegendHover.js 手动更新图例 data。

## 现象
- 扇区 hover 的 highlight 不会自动放大图例文字
- ECharts legend.emphasis 仅鼠标直接悬停图例时生效

## 根因
- 扇区 hover 触发的高亮事件不联动图例 emphasis 样式

## 解决方案
- 新增 pieLegendHover.js，扇区 hover 时手动更新图例 data
- 当前项文字放大加粗、其余项透明度降至 35%
- 监听 mouseover/highlight/mouseout/globalout，兼容单行与多行图例

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证证据：园区物管2.0/035.md
- 涉及文件：node_modules/zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、fundPanorama/index.vue、zhi2-web-admin 下同路径 index.vue、package.json、pieLegendHover.js
- 所属项目：园区物管2.0
- 来源会话：fc8ed852-b9d6-4d0f-bba8-17f9b9edb32f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_hover_legend_highlight",
  "source_extraction_id": "5336140ca3d7438dbc51c1ec0fc6e624",
  "version": 1,
  "memory_type": "entities"
}
-->