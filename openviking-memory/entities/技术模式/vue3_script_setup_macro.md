# Vue 3 script setup 编译器宏无需导入
苏住房C 移动端项目在 `<script setup>` 中 `defineProps` 与 `defineEmits` 为编译器宏，自动注入，无需从 `vue` 导入。

## 问题原因
- Vue 3 编译器提示在 `<script setup>` 中误 import `defineProps`/`defineEmits`
- 多个组件文件含多余 vue import 引发警告

## 修复要点
- 移除 `FilterPopupComponent.vue`、`NewFilterComponent.vue` 中 import 的 `defineProps`、`defineEmits`
- 删除 `CompanyItem.vue`、`PropertyCard.vue`、`PropertyItem.vue` 整行 vue import
- 差量编译后警告消失，首次全量编译旧输出可忽略

## 涉及文件
- src/page-query/components/FilterPopupComponent.vue
- src/page-query/components/NewFilterComponent.vue
- src/page-query/components/CompanyItem.vue
- src/page-query/components/PropertyCard.vue
- src/page-query/components/PropertyItem.vue

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：b7ff0fc8-8e3a-4961-ab91-06155333fe7b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_script_setup_macro",
  "source_extraction_id": "72b5a7991bd24f12a5931971c8afda85",
  "version": 1,
  "memory_type": "entities"
}
-->