# 二手房列表页筛选栏吸顶位置修复
苏住房C二手房列表页（stockHouse/index.vue）筛选栏吸顶位置错误留出空隙，已修复。

## 问题原因
- `.sticky-box`使用`top:40px`，滚动吸顶时在导航栏下方留约40px空隙，上方内容从缝隙露出

## 修复方案
- 将`tab-line`（全部/个人房源/中介房源）移入`sticky-box`与筛选栏一起吸顶
- `top:40px`改为`top:0`，紧贴页面内容区顶部（导航栏下方）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：stockHouse/index.vue、conditionScreening.vue等
- 来源会话ID：9ab5f462-ee46-4fde-9e2b-8231f0fab02d

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stock_house_sticky_fix",
  "source_extraction_id": "7eca3a8230794a36a6dc360689fe3cb5",
  "version": 1,
  "memory_type": "entities"
}
-->