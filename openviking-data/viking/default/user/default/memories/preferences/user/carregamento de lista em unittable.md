- 从 `unitTable` 中的 `buildingId` 的 `watch` 移除 `immediate:true`；首次加载应仅使用 `subTableMixins` 的 `init()`。
- 避免由 `init()` 和 `watch(immediate:true)` 均调用该函数而引起的 `getList()` 重复调用。
- `buildingId` 的更改在初始加载后继续通过 `watch` 触发更新。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Carregamento de lista em unitTable",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "preferences"
}
-->