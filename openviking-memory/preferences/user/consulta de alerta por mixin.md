- 在 `src/views/benefit/alert/index.vue` 中，四个查询按钮先调用 `switchWarningType`，然后调用 mixin 中无参数的 `getList()`。
- 移除页面中重写的自定义 `getList` 实现。
- 配置 `moduleName: 'benefit'` 和 `businessName: 'warningAnalys'`。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Consulta de alerta por mixin",
  "source_extraction_id": "d844f94ca9c9437188f0c9b246ecc583",
  "version": 1,
  "memory_type": "preferences"
}
-->