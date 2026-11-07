# zs-select-dialog 动态实例未注入 store 修复
园区物管2.0 中 SelectDialog.open() 动态创建弹窗实例时未注入 Vuex store，导致使用 @/mixins/table 的组件报错。

## 问题原因
- `SelectDialog.open()` 通过 `new instance.constructor(component)` 创建弹窗根实例，未注入 `$store`。
- `ZsSelectDialogFunc` 使用 `@/mixins/table`，其 `tableConfig` 计算属性访问 `this.$store.getters['table/getTableConfig']`，动态实例无 `$store` 报错 `Cannot read properties of undefined (reading 'getters')`。

## 修复方式
- 创建弹窗实例时注入 `store`、`router` 并设置 `parent`，与 `main.js` 中 `window.__VUE_APP_STORE__` 设计一致。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/components/zs-select-dialog/zs-select-dialog-func.vue、src/mixins/table.js、src/main.js、src/views/autonomy/general/detail.vue
- 所属项目：园区物管2.0；来源会话：7f55cc88-82e0-457b-85fe-e1f0ed843e51；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_store_fix",
  "source_extraction_id": "8bbb42a345f6475a9e716b0444aa32ed",
  "version": 1,
  "memory_type": "entities"
}
-->