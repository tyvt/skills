# 地图找房远程配置对比分析
苏住房C 对比「苏找房」与「我要买房」中「地图找房」远程配置，结论为两处接口 path 与四个字段完全一致，差异仅在配置结构与前端用法。

## 接口对比结论
- `navigation.home`（苏找房）与 `navigation.mid`（我要买房）的「地图找房」path 完全一样
- 四个字段一字不差：iconPath、bgPath、url(`1_4_5`)、isShow(`0`)
- 两条 curl 均 HTTP 200，地址无问题

## 配置结构差异
- 「我要买房」其它宫格（新房、个人房源等）iconPath 为完整大图（约6~7KB，背景+图标一体），bgPath 无，只读 iconPath 即可显示
- 「地图找房」（两处配置相同）结构不同，需前端按字段分别处理

## 涉及文件
- zhi2-mobile-shimin/src/pages_tab/components/menu/HomeNavItem.vue
- zhi2-mobile-shimin/src/pages_tab/components/menu/MidModuleGrid.vue
- zhi2-mobile-shimin/src/pages_transaction/stockHouse/index.vue
- zhi2-mobile-shimin/src/pages/index/components/Home_Suzhufang.vue
- zhi2-mobile-shimin/src/pages/index/components/MenuCard.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：66cc6474-3880-4c57-acf8-17f2a7526b89；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "map_find_config",
  "source_extraction_id": "97382b07988845cbb14e671586e0f5f0",
  "version": 1,
  "memory_type": "entities"
}
-->