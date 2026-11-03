- 弹窗 `@closed` 事件中将 `credential` 重置为 `{}`（与 `data()` 初始值一致），而非 `null`，避免关闭动画期间模板访问 `credential.photo` 等属性触发空指针报错。
- `InfoCardDialog.vue` 与 `WorkCardDialog.vue` 均需遵循此重置方式。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "前端弹窗credential重置方式",
  "source_extraction_id": "2a83d78a0142463db285de8a34a128c9",
  "version": 1,
  "memory_type": "preferences"
}
-->