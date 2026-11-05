# Vue 组件列表空值保护模式
产品2.0 中 `HeadTitle` 等组件的列表元素可能为 `undefined`/`null`，直接访问 `item.value` 会报 `Cannot read properties of undefined (reading 'value')`，须加空值保护。

## 问题根因
- `this.list` 中存在 `undefined`/`null` 元素，计算属性 `this.list.filter((item) => item.value)` 与模板 `v-if="item.value"` 直接访问属性导致 TypeError。

## 解决方案
- 模板中改为 `v-for="(item, index) in displayedList" :key="index" v-if="item && item.value"`
- 计算属性中改为 `const visibleItems = this.list.filter((item) => item && item.value)`
- `showExpandButton` 等逻辑同样加 `item &&` 守卫。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/components/HeadTitle/index.vue、row.vue
- 所属项目：2-0（产品2.0）；来源会话ID：81bba5d5-8e98-492f-90aa-3fa01f341b6d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_list_null_guard",
  "source_extraction_id": "124dfc8798774857a6faa686dbc20e7d",
  "version": 1,
  "memory_type": "entities"
}
-->