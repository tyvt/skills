# Vue component reuse and async race cause column display chaos
In regionBankAuth page, switching city/district/street levels shows wrong columns due to key collision and concurrent responses.

## Root Cause
- Column key only used column.prop, causing Vue to reuse mismatched component instances for different column types
- Rapid switching of city/district/street triggered concurrent getList requests whose responses overwrote each other

## Fix
- Bind :key="tableViewKey" on the table
- Column key concatenates ${tableViewKey}-${column.prop}-${column.type}
- Use listRequestId to discard stale responses

## Verification and Scope
- Verification: src=苏住房G/064.md
- Files: zhi2-web-admin/src/views/system/regionBankAuth/index.vue, detail.vue, utils.js, zhi2-web-admin/src/mixins/listMixins.js, zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue
- Project: 苏住房G; Source session: ecdea30a-99b2-441c-917e-7cbad52000ed; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "suzhufang_g_tech",
  "name": "region_column_race_bug",
  "source_extraction_id": "bef229ef9efa47e0b71ee6b556779111",
  "version": 1,
  "memory_type": "entities"
}
-->