- `zs-table` 应使用 `:loading` 仅覆盖 `.el-table__body-wrapper`，保持表头始终可见。
- 旧的 `v-loading` 使用 `MutationObserver` 来同步宽度/高度与主体，并在布局变化时重新对齐；禁止在同一表格中混合使用这两种写法，以避免出现双 spinner。
- 验证证据: src=苏州市房地产监测V3/050.md

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Estado de carregamento zs-table",
  "source_extraction_id": "5a89d476ffe0486290347903c3f03503",
  "version": 1,
  "memory_type": "preferences"
}
-->