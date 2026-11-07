# ECharts 横轴区县名清晰显示
苏住房G 地图/面板类 ECharts 柱图横轴区县名被裁/重叠时，需 containLabel + 动态 grid 底部 + 按数量切倾斜。

## 问题根因
- grid.containLabel: false 且 bottom 写死 34，坐标轴标签不占布局空间导致被裁/重叠

## 解决方案
- grid.containLabel: true，底部留白随类目数调整：>6 个时 64、否则 52
- 类目 >6 时 xAxis.axisLabel 设 rotate 35°、align:'right'、margin:12、fontSize:13，显式 interval: 0 保证全部区县都画
- 不要用 hideOverlap，它会静默吞掉部分标签造成「少了一个区县」的误解
- 图表容器加专用类补 padding-bottom（10px），否则倾斜标签贴 panel 内缘
- 参数写在同目录 chartOptions.js 的 buildXxxOption 里，靠已有 handleResize → chart.resize() 覆盖缩放场景

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 725e800e 用户反馈监管账户数量横坐标区域显示不清；改动 chartOptions.js 的 buildDistrictManageOption 与 index.vue 容器 padding
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js、zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：苏住房G；来源会话ID：725e800e-590a-4121-bcda-f06988a87527；代码基线：db4f82c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_district_axis",
  "source_extraction_id": "4c74f7a87e624832885083b5159980bf",
  "version": 1,
  "memory_type": "entities"
}
-->