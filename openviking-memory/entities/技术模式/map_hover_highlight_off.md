# 地图鼠标移入与点击禁用高亮
园区物管2.0 地图概览页已禁用鼠标移入与点击地图区域时的高亮样式，轮播高亮不受影响。

## 问题背景
- 点击高亮来自 ECharts 选中态 select，与之前禁用的悬停态 emphasis 是两套机制
- 需同时屏蔽移入与点击产生的高亮

## 解决方案
- geo 设 silent:true 不响应鼠标事件，并禁用 select 与 blur
- 轮播高亮 regions 同样禁用 select 与 blur，避免点击轮播区域出现选中样式
- map 系列设 selectedMode:false，禁用 emphasis、select、blur 轮播切换
- 黄色轮播高亮仍由 updateMapGeoCarouselHighlight 通过 regions 控制
- initMap 中抽出 WUXI_GEO_BASE_ITEM_STYLE 常量（与原默认 itemStyle 一致），geo.itemStyle 改用该常量。
- geo.emphasis 改为 itemStyle 与默认相同、label 的 formatter/rich 与普通态一致（wuxiMapLabelRich(false)），移入时视觉与常态一致，相当于去掉移入高亮；轮播 buildMapGeoCarouselRegions 仍对各块同时设置 itemStyle 与 emphasis 为高亮样式，高亮块移入不再「闪一下」。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、chartOptions.js、constants.js
- 所属项目：园区物管2.0；来源会话：ec2f2919-958c-46a4-9979-f0e697d4c8c7、dc3adc83-b4a0-4e74-9b28-aebb578f54f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_hover_highlight_off",
  "source_extraction_id": "450911fc77f34fce93c2797e495cb7dd",
  "version": 2,
  "memory_type": "entities"
}
-->