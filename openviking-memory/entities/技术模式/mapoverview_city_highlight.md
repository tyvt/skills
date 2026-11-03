# mapOverview 全市轮播高亮修复
无锡地图 SVG 轮播在「全市」分支需为全部区县推入 geo regions 高亮项，否则视觉上全部不亮。

## 问题根因
- 单区轮播会对 highlightName 推入带 WUXI_GEO_HIGHLIGHT_ITEM_STYLE 的 regions 项
- 轮播到「全市」时若 highlightName 设为 null 且 buildMapGeoCarouselRegions 对 !highlightName || highlightName==='全市' 直接 return regions（仅留江阴飞地 silent），则无区县带高亮 itemStyle，全部不亮

## 修复方案
- 全市分支仍遍历 WUXI_SVG_GROUP_REGIONS（除飞地外）为每个区县推一条与单区轮播相同的高亮样式与 wuxiGeoCarouselHighlightLabel()
- 飞地 silent 项补上与「江阴市」单区时一致的 emphasis/itemStyle，使全市态与单区态视觉一致

## 验证与归属
- 验证：会话 d90e73b5 用户报全市应全部高亮却全部不亮；根因全市分支未设置 WUXI_GEO_HIGHLIGHT_ITEM_STYLE，改遍历区县加 regions 后修复
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、zhi2-web-admin/src/views/benefit/mapOverview/mock.js
- 所属项目：园区物管2.0；代码基线：3353ef164；来源会话：d90e73b5-e60c-4919-b4fa-937e9f6f410d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mapoverview_city_highlight",
  "source_extraction_id": "fbe34a26be854f6a8e62e198fe539062",
  "version": 1,
  "memory_type": "entities"
}
-->