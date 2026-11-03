# 侧边栏开合 ECharts 延时重绘
园区物管2.0 带侧边栏的大屏 ECharts 页面需在 watch sidebar.opened 后延时 chart.resize()，因为侧栏开合不触发 window.resize。

## 问题根因
- 侧边栏展开/收起只改布局与 CSS 变量，不触发 window 的 resize 事件
- 页面若仅监听 window.resize，ECharts 按旧容器尺寸绘制，图表不铺满、饼图不居中
- 数据沙箱 fundPanorama、assetPanorama 等页曾出现该问题

## 解决方案
- mapGetters(['sidebar']) 后 watch 'sidebar.opened'
- 回调里 $nextTick(() => setTimeout(() => this.handleResize(), 300))
- handleResize 对全部实例 chart.resize()；过渡动画偏慢可调到 350ms
- 与 LineChart.vue、ComponentCharts.vue 既有做法一致，新增图表页直接复用

## 验证与归属
- 验证：会话 6e8fda3d 在 fundPanorama/index.vue 与 assetPanorama/index.vue 增加 watch sidebar.opened + $nextTick + setTimeout(handleResize,300)，明确 window resize 不触发、与首页图表 setTimeout(...,300) 节奏一致
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、zhi2-web-admin/src/views/home/components/LineChart.vue
- 所属项目：园区物管2.0；代码基线：177bc3ce4..fc994977f（会话时间 2026-04~07）；来源会话：6e8fda3d-c999-4ae3-aeaf-20421ded45c3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_echarts_resize",
  "source_extraction_id": "a1ffc258770840b091dc679561b91a7b",
  "version": 1,
  "memory_type": "entities"
}
-->