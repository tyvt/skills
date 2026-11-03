# Table Column Link Failure Due to Refactor
A refactor of `zs-table-column.vue` caused table link buttons to fail due to attribute passthrough conflict and incorrect type detection.

## Description
- `zs-table-column.vue` passed `index`/`function` to `el-table-column`, conflicting with native props.
- Custom `type="link"` detection via `scope.column.type` failed.

## Root Cause
- Passthrough of `index` and `function` broke native `el-table-column` attributes.
- Using `scope.column.type` instead of `$attrs.type` made `type="link"` invisible.

## Fix
- Intercept passthrough for non-`type="index"` columns.
- Use `$attrs.type` to detect custom link type, supporting both `:index="handler"` old and `type="link" :function` new usages.

## Verification
- Evidence: src=苏州市房地产监测V3-rest/005.md
- Source session: bb86fbc4-fb2e-46ab-8ef7-7ec642005b52

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "table_column_link_fix",
  "source_extraction_id": "23e8a3d6cd95441bbfbb4be068db545e",
  "version": 1,
  "memory_type": "entities"
}
-->