# 地图概览页底部栅格间距调整
园区物管2.0 地图概览页底部一行用 CSS Grid 布局，原比例致右侧排名区域偏窄、间距偏大，已调整为更均衡的占比。

## 现象
- 底部一行左侧「物业管理区域数量」更宽，右侧「物业管理区域账户余额排名」仅占约 44%，视觉不协调。

## 调整方案
- 将 grid 由 `1.12fr 0.88fr` 改为 `1fr 1.22fr`，右侧列略大于左侧，排名区域整体更宽，区域名称与金额列更舒展。
- 若需更宽可将 `1.22fr` 调到 `1.28fr`～`1.35fr`；若左侧柱状图过挤则往回调。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：1063d8bb-91e2-41cc-a94c-d70270312b59；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_grid_spacing",
  "source_extraction_id": "450911fc77f34fce93c2797e495cb7dd",
  "version": 1,
  "memory_type": "entities"
}
-->