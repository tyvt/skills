
# Project Location Two-Column Layout
The "项目坐落" field occupies two columns in a three-column grid to avoid misalignment of "统一社会信用代码" with "行政区划".

## Problem
- In an `el-row`, "项目坐落" occupied 16 grids, pushing "统一社会信用代码" to the third column misaligned with "行政区划"
- Edit mode needed vertical alignment of fields

## Solution
- Use `section-form` three-column grid in edit mode
- `section-field` for normal fields, `section-field--wide` for "项目坐落" (two columns), `section-field--full` for presale description (full row)

## Files and Attribution
- Verification: src=苏州市房地产监测V3/166.md
- Files: presale/permit/components/detail.vue, presale/permit/components/PermitInfoPanel.vue, presale/permit/permitConstants.js, detail-template/detail-template.vue, presale/permitExtend/permitExtendConstants.js, presale/permitSelectConstants.js, presale/permitExtend/detail.vue, presale/surveyChange/surveyChangeConstants.js
- Project: 苏州市房地产监测V3; source session: f7e32c84-3538-433f-bf02-d17f353e9e06; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f7e32c84-3538-433f-bf02-d17f353e9e06


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "project_location_two_columns",
  "source_extraction_id": "494398012a1245589ff9d3e73a52e1cb",
  "version": 1,
  "memory_type": "entities"
}
-->
