# Grid Offset Missing Causes Column Misalignment
Full-width grid row lacking gridOffset caused next row misalignment; fixed with gridOffset.

## Description
- Project: 苏州市房地产监测V3 (zhi2-web-admin), presale permit cancel/extend details.
- "行政区划+项目坐落" filled 24 grid columns; "统一社会信用代码" wrapped to column 1, not aligned to column 3.

## Fix
- In view state DetailTemplate add gridOffset; buildCancelBasicInfoView set gridOffset:{lg:16}.
- In edit state use lg=16 placeholder + credit code lg=8 to align column 3.

## Verification
- Evidence: src=苏州市房地产监测V3-rest/086.md
- Source session: db3f4214-4b5b-4cbc-b081-3c46c8cde75a
- Files: permitCancel/detail.vue, permitExtend/detail.vue, permitExtendConstants.js, detail-template.vue, permitCancelConstants.js, permitConstants.js, PermitInfoPanel.vue, index.scss

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：db3f4214-4b5b-4cbc-b081-3c46c8cde75a


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "grid_offset_missing",
  "source_extraction_id": "00d57bddf9a64d5a9050828e7fc3d93f",
  "version": 1,
  "memory_type": "entities"
}
-->
