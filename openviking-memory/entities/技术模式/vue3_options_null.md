# Vue3 下 this.$options 判空
Vue 3 组合式组件或 mixin 复用场景下 `this.$options` 可能为 `undefined`，直接访问 props 会报错，须前置判空。
## 问题根因
- Vue 3 组合式组件或 mixin 复用场景下 `this.$options` 可能为 `undefined`。
- `src/mixins/listMixins.js` 的 `data()` 未判空直接访问 `this.$options.props` 抛出 Cannot read properties of undefined。
## 解决方案
- 在 `src/mixins/listMixins.js` 的条件判断中增加 `!this.$options` 前置判空后再访问 props。
## 验证与归属
- 验证证据：src=2-0/015.md
- 涉及文件：src/mixins/listMixins.js
- 所属项目：2-0；来源会话ID：9b1d4896-b6df-43ec-8825-e0a68abff6e2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_options_null",
  "source_extraction_id": "6d18fa7d688944059b189e2db9628a41",
  "version": 1,
  "memory_type": "entities"
}
-->