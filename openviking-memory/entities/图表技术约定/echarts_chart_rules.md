# ECharts 图表约定
园区物管2.0 大屏图表的多项固定交互与布局约定，fundPanorama 与 assetPanorama 等页保持一致。

## Y 轴留白
- 本项目柱状图 grid 设 containLabel:false，Y 轴 axisLabel 不计入布局
- 默认 grid.left 偏小会刻度贴边或裁切，必须同时加大 grid.left（约+14px）和 axisLabel.margin（12px）
- 统一调 chartOptions.js 中的 BAR_Y_AXIS_LABEL（margin:12）与各柱图 grid.left

## 饼图悬停
- ECharts 默认 emphasis.focus='self' 会把其他扇区淡化为白色，用户明确不要此效果
- 统一 emphasis.focus='none'（只保留当前扇区放大）
- 配合自研 bindPieLegendHover 做图例联动高亮

## 地图点击高亮
- 点击高亮源于 ECharts 选中态（select），与悬停态（emphasis）机制独立
- 修复：geo 设 silent:true 且 select/blur disabled
- 轮播 regions 禁用 select/blur；map 系列 selectedMode:false 并禁用 emphasis/select/blur
- 轮播高亮仍由 updateMapGeoCarouselHighlight 通过 regions 控制
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、chartOptions.js、constants.js

## 地图布局偏移
- benefit/mapOverview/index.vue 中 ECharts geo.layoutCenter 水平中心调至 54%
- 容器 .chart-box--map 的 margin-left 提至 40px、width 改为 calc(100% - 40px)，使 SVG 地图右偏规避重叠
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue；来源会话：d2cb178b-821e-4d12-bc8c-dcc1bbe2bb0d

## 账户总额波动动画
- benefit/mapOverview/index.vue 在 requestAnimationFrame 前将 item.value 置为 ACCOUNT_TOTAL_FLUCT_MIN 实现瞬时回落
- 随后在 ACCOUNT_TOTAL_FLUCTUATE_MS 内以 ease-out 三次方曲线动画回升至 peak 并清除 RAF
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue；来源会话：0b8f2c2c-0c15-43a9-8574-10b93bc384f2

## 关联
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js、src/views/benefit/dataSandbox/pieLegendHover.js
- 所属项目：园区物管2.0
- 来源会话：5b0caae3-e374-44ea-8848-04caf6f893c4、caf5eb6c-f488-4efa-acec-cd88dff68378

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "图表技术约定",
  "name": "echarts_chart_rules",
  "source_extraction_id": "451448d91eb84f1fa454c719d9bb963a",
  "version": 3,
  "memory_type": "entities"
}
-->
