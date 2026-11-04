# 样式覆盖和间隔元素导致间距丢失
在 Park Public Benefit (zhi2-web-admin) 项目中，pubHouse/detail.vue 中的 :deep 规则和 RegionTreeLayout.vue 中的间隔元素导致全局列表页面中块之间的间距丢失。

## 问题根因
- pubHouse/detail.vue 包含 :deep(.collapse-container + .collapse-container){margin-top:0} 覆盖了 Headline 组件的全局间距
- RegionTreeLayout.vue 包含间隔元素 .type-left-toolbar-spacer (min-height:32px+margin:5px 0) 导致顶部出现空白

## 解决方案
- 移除覆盖，恢复相邻块之间全局的 margin-top:12px
- 移除 RegionTreeLayout.vue 中的间隔元素和样式，影响 15 个全局列表页面

## 涉及的文件
- src/views/benefit/pubHouse/detail.vue
- src/components/Headline/index.vue
- src/views/property/complex/components/RegionTreeLayout.vue

## 验证与归属
- 所属项目: Park Public Benefit; session: 10639736-d230-4e7f-93b8-169a25bf4221; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "collapse_spacer_fix",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->