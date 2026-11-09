# ZenTao Bug 6084
Bug 6084 in zhi2-web-admin about supervision account opening branch-select dialog pagination not staying in one screen; reactivated 2026-11-09, reviewed and resolved same day.

## Description
- Title: [Suzhou Real Estate] Regulatory account opening: when selecting opening branch, total count and pagination must show in one screen
- Status: activated by lichandan 2026-11-09 10:12 with "this phenomenon still exists"; resolved again 2026-11-09 13:28:49 by tiany
- Assigned to: tiany, then reassigned to lichandan after resolution

## Root Cause and Fix Review
- 11-03 fix by tiany still present: BranchOneDialog.vue tableScroll prop, unionBankBranch.js forward, three detail.vue tableScroll:true, zs-dialog.vue --table-scroll CSS; commits eab41abd7 / 58f225ac6
- Deployed package 58.210.252.230:9002 version 2.6.1 / 2026-11-06 16:29 / gitHash 92250ea contains fix
- Clean Chrome reproduction at 1798x949 showed pagination in view (pagInView true), no scroll; tester screenshot likely old cached bundle

## Resolution Action
- DBX write-back: status resolved, resolution fixed, resolvedBuild trunk, resolvedBy tiany, resolvedDate 2026-11-09 13:28:49, assignedTo lichandan
- Added zt_action id 89293 with 1226-char note; action history: opened -> assigned -> edited -> resolved -> activated -> resolved
- No source code changes; temp files .tmp-bug6084 deleted

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6084",
  "source_extraction_id": "0bf9b8470bee4c0a862411349fe908ec",
  "version": 1,
  "memory_type": "entities"
}
-->