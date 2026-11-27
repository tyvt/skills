---
audit_status: valid
last_checked: 2026-11-27T18:20:05+08:00
verdict_note: 惠山二期G zhi2-web-admin/src/formatters/housePosition.js 命中，位置分隔符修复描述属实
---
# Bug 6677 House Position
Zentao bug 6677 fixed missing separators in Huishan Phase 2G house-location display and was completed on 2026-11-25.

## Display Data
- Property management region detail pages contain "Building List" and "House Property" tabs; the "House Count" numeric link (2026-11-25: Longshunyuan had 12) opens the house list dialog.
- House-location display formatting is centralized in the new `src/formatters/housePosition.js` (alias-free for direct Node unit tests) and exported as default `housePositionFormatter` from `src/formatters/index.js`.

## Delivery
- The missing separator issue was fixed, verified, pushed, and written back to Zentao on 2026-11-25.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "bug_6677_position",
  "source_extraction_id": "e3712e5dae714c35b6d3f4d5e0113e49",
  "version": 1,
  "memory_type": "entities"
}
-->