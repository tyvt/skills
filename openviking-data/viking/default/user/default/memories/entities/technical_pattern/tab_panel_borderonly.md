# Tab Embedded Panel Must Use borderOnly to Avoid Title Duplication
In 苏州市房地产监测V3 project, Tab embedded detail panel downgraded to div loses border and duplicates title; Headline adds borderOnly prop.

## Root Cause
- Tab embedded detail page panel downgraded to div lost border and caused title duplication

## Fix
- Headline/index.vue adds borderOnly prop preserving .collapse-container outer frame and hiding title bar
- PermitInfoPanel.vue and three other components use this prop
- PresaleBuildingSection.vue and detail.vue top-level Tab changed to type="card"

## Verification
- Evidence: src=苏州市房地产监测V3-rest/024.md
- Files: presale/permit/components/detail.vue, Headline/index.vue, index.scss, PresaleBuildingSection.vue, PermitInfoPanel.vue, permitCancel/detail.vue, CashsaleDetail.vue, CashsaleInfoPanel.vue
- Project: 苏州市房地产监测V3; source session: 7449fdc3-42d5-42b0-88b6-d6daed5dc2cd; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：7449fdc3-42d5-42b0-88b6-d6daed5dc2cd


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "tab_panel_borderonly",
  "source_extraction_id": "189598b2f6764b21a56e2b7829ae5bc5",
  "version": 1,
  "memory_type": "entities"
}
-->
