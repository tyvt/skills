# Drag Inset El Dialog Full
v-dialogDrag directive wrote inset:0 to .el-dialog causing el-dialog__wrapper to fill and popup blank in zhi2-web-admin of Suzhou real estate monitoring V3.

## Problem
- v-dialogDrag in src/directives/dialog/drag.js set inset:0 on mount, stretching el-dialog__wrapper and leaving popup blank

## Fix
- Rewrote drag.js to use top:15vh + left:50% + translateX(-50%) for centering
- Added :draggable="false" to zs-select-dialog and zs-select-dialog-func to prevent directive altering size

## Verification
- Evidence: src=苏州市房地产监测V3/024.md
- Source session: 003d6075-c1af-4232-b337-c044d45c5078
- Files: detail.vue, zs-select-dialog.vue, zs-select-dialog-func.vue, zs-dialog.vue, zs-table.vue, index.scss, package.json, SelectRecordProcedureDialog.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：003d6075-c1af-4232-b337-c044d45c5078


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "drag_inset_el_dialog_full",
  "source_extraction_id": "1cc45ec5d4884c59bd02675edfddcc14",
  "version": 1,
  "memory_type": "entities"
}
-->
