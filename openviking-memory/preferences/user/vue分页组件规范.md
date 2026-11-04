- 为统一分页规范，`src/pages` 下 11 个 Vue 文件从 `useLoadMore`/`uni-load-more` 迁移至 `z-paging` + `usePaging`。
- `collect/index.vue` 搜索回调重命名为 `handleSearch` 避免冲突。
- `announcement/index.vue` 的 `reload()` 改为 `refresh()`。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue分页组件规范",
  "source_extraction_id": "4e1cbc260d4a48c486599efc80cfb1a7",
  "version": 1,
  "memory_type": "preferences"
}
-->