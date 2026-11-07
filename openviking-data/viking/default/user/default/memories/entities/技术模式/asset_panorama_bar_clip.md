# 资产全景页横向柱状图坐标轴裁切与纵向滚动缺失
园区物管2.0 资产全景页（assetPanorama）横向条形图底部坐标轴被裁切且内容无法纵向滚动，已通过 ECharts grid 配置与布局裁切调整修复。
## 问题根因
- `grid.bottom` 仅 4px，数值轴刻度、轴线无足够空间，X 轴看不见
- 原 `xAxis.axisLine.show: false` 轴线不画；`scale-clip` 与 `.chart-block__canvas` 均用 `overflow: hidden` 裁掉贴边坐标轴
- `stage` 使用 `flex: 1` + `height: 100%` + `overflow: hidden`，高度锁在视口内，内容再高也撑不开滚动条
## 解决方案
- ECharts 横向条形图 `grid.bottom` 改为 32，`top`/`right` 略增，给刻度和右侧数值留空
- `xAxis.axisLine.show: true` 画出底部轴线（浅灰）
- `scale-clip` 去掉纵向 `hidden`，改在 CSS 里 `overflow` 调整；`.chart-block__canvas` 不再裁切贴边轴
## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、mock.js
- 所属项目：园区物管2.0；来源会话：d9192f5b-c2bf-4f01-ba6a-ecefdcde18d0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_panorama_bar_clip",
  "source_extraction_id": "477bafa538a146f292640a311974b9bc",
  "version": 1,
  "memory_type": "entities"
}
-->