# Migration Table Save Perm Key
Migration tables in zhi2-web-admin caused save errors and permission primary key misalignment in Suzhou real estate monitoring V3.

## Problem
- PlanDetailsTable.vue called undefined save via saveButton causing save error
- contractTable.vue row-key and primaryKey used personId mismatching multi-select delete

## Fix
- PlanDetailsTable.vue uses viewButton/editButton/deleteButton, permission capital:plan:add/remove
- PeasantAccountTable.vue permission synced to capital:jddetail:add/remove
- contractTable.vue row-key/primaryKey changed to specialDetailId

## Verification
- Evidence: src=苏州市房地产监测V3/025.md
- Source session: b2a4d79d-3d96-4875-bf1f-63085405dffc
- Files: detail.vue, OperationBtnGroup/index.vue, zs-table-column.vue, AgreementDetailsTable.vue, companyRecordAgency/detail.vue, JymxTable.vue, recordTable.vue, serviceItem/index.vue

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "migration_table_save_perm_key",
  "source_extraction_id": "1cc45ec5d4884c59bd02675edfddcc14",
  "version": 1,
  "memory_type": "entities"
}
-->