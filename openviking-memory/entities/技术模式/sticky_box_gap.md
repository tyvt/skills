# .sticky-box top:40px 留隙致吸顶错
苏住房C 移动端 `.sticky-box` 设置 `top: 40px` 导致吸顶时在导航栏下方留出空隙，banner 从缝隙露出。

## 问题根因
- `.sticky-box` 设 `top: 40px` 吸顶时与导航栏间留 40px 空隙
- banner 从缝隙中露出，吸顶位置错误

## 修复要点
- 将 `tab-line` 移入 `.sticky-box` 内部
- `.sticky-box` 设 `top: 0`，使其紧贴导航栏下方整体吸顶

## 涉及文件
- src/pages_transaction/stockHouse/index.vue
- src/components/commonNew/conditionScreening.vue
- src/pages.json
- src/components/commonNew/tabBtn.vue
- src/uni.scss
- src/components/commonNew/tabLine.vue
- src/pages_transaction/newHouse/index.vue

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：9ab5f462-ee46-4fde-9e2b-8231f0fab02d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sticky_box_gap",
  "source_extraction_id": "b593d87ec37f4a2daf53a37fe760199f",
  "version": 1,
  "memory_type": "entities"
}
-->