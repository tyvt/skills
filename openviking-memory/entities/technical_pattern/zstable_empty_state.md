# zsTable Empty State Uses Element Default
Xinghua property management (兴化物管) zhi1-web-admin zsTable/index.vue drops custom empty state for Element UI default "no data".

## Background
- zsTable had a custom empty slot and unhandledrejection listener that needed simplification.

## Solution
- Remove empty slot, emptyText field, watch, and the created-hook unhandledrejection listener and handleError method.
- Keep doLayout and the .el-table__empty-text style.
- Empty state now shows Element UI default "暂无数据" (no data).

## Verification
- Evidence: cursor session e27192d0-0106-412e-86ca-44489c556107
- Files: src/components/zsTable/index.vue
- Project: 兴化物管

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "zstable_empty_state",
  "source_extraction_id": "dfed095b4ba749ebb4b9c32e8aad66f8",
  "version": 1,
  "memory_type": "entities"
}
-->