# zhi2-flood-history
History query module in Suzhou Housing flood-control C-end H5 `src/stores/flood.ts`, handling remote inspection-record listing, counting, and detail.

## Module Structure
- `fetchHistoryRemote` calls `request` from `../utils/request`; with `{ raw: true }` the client returns the raw page `{ rows, total }`
- `countHistory` computes per-status counts from the fetched rows
- `getRecordAsync` (detail page) maps a row to a record via `inspectionRowToRecord` at line 464
- `inspectionRowToRecord` is the shared mapping used by both list and detail views

## Key Mappings
- `STAGE: { pre: '2', mid: '3', post: '4' }` maps inspection stage to the `inspectionStage` param (pre=2, mid=3, post=4)
- `KIND_BY_STAGE` maps the stage back to the record `kind`
- `bizState` is mapped to `status`; list and detail share the same `bizState`→`status` mapping and filter separation

## Testing
- Remote-mode tests mock `request` to lock the `bizState`→`status` mapping and the list/detail filter separation

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "zhi2_flood_history",
  "source_extraction_id": "27e5be11847d4ae6a086674ed801460c",
  "version": 1,
  "memory_type": "entities"
}
-->