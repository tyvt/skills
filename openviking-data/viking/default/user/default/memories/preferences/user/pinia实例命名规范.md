- 统一将 Pinia 实例命名为 `const useUser = useUserStore()`，不使用 `userStore` 命名（应用于 api/index.js、App.vue 等 9 个文件）。
- 移除回调内重复声明，复用顶层实例。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Pinia实例命名规范",
  "source_extraction_id": "41290def6eab418c91baea7174a07d93",
  "version": 1,
  "memory_type": "preferences"
}
-->