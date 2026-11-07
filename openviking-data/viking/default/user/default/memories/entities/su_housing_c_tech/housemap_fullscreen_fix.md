
# 地图未铺满全屏问题修复
苏住房C「地图找房」页因容器高度计算错误导致底部留白，已分两次修复铺满全屏。

## 问题根因
- 初次：houseMap.vue 中 ZsMap 上写内联样式 height: 200px 锁死高度，地图无法撑满
- 后续：容器改用 height: calc(100vh - 43px - env(safe-area-inset-top))，但微信小程序内容区已在导航栏下方，再减导航栏高度致容器偏矮

## 修复内容
- houseMap.vue 移除 style="width: 100%; height: 200px"，改用 calc 高度再改为 height:100% 随页面铺满
- ZsMap.vue 内部 map 设置 width: 100%; height: 100%，确保父容器有高度时能撑满
- 为 page 设置 height:100% 和 overflow:hidden，地图用绝对定位铺满，筛选栏浮于上方

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：houseMap.vue、ZsMap.vue、App.vue、pages.js、pages.json、NewHouse.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：a8639b2e-9ee0-4789-a462-e47f95ce5510；5735d92c-20ba-4d48-87c7-2b6597fa43b8
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "housemap_fullscreen_fix",
  "source_extraction_id": "82af7a5679844eb3b2da51f4435a7f0c",
  "version": 2,
  "memory_type": "entities"
}
-->