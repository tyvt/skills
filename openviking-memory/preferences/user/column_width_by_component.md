- In `HomeTodoTable.vue` remove all `width`/`min-width`; `zs-table-column` calculates column width by canvas based on content: <280px outputs fixed `width` not participating in remaining expansion, larger outputs `min-width` with elastic distribution; threshold controlled by `SHORT_COLUMN_FIX_THRESHOLD` (280).
- Involved files: HomeTodoTable.vue, homeLayout.js, package.json, zs-table-column.vue, zs-table.vue, homeDataMixin.js, zs-operate-column.vue.
- Evidence: src=门户/017.md; session: fd264e18-0e1a-4414-bf35-742d17d79c11

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：fd264e18-0e1a-4414-bf35-742d17d79c11


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "column_width_by_component",
  "source_extraction_id": "901c89ab7bc74fdba0496feae18a55a3",
  "version": 1,
  "memory_type": "preferences"
}
-->
