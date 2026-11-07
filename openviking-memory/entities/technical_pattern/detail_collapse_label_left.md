# Collapse Label-Left Bottom Spacing Reset
In Suzhou Real Estate Monitoring V3, the `label-position="left"` collapse area (enterprise network access / change filing) missed the bottom padding reset rule in `detail-form.scss`.
## Root Cause
- `label-position="left"` collapse area (enterprise network access / change filing) did not match the bottom whitespace reset rule in `detail-form.scss`
## Solution
- Added `.collapse-container > .collapse-content:not(.hide)` with `padding-bottom:0` and `margin-bottom:0` in `detail-form.scss`
- Split `el-form--label-top` block and added `.detail-from-container` global override
## Verification
- Evidence: src=苏州市房地产监测V3-rest/048.md
- Files: detail-form.scss, index.scss, detail.vue, variables.css, Headline/index.vue, detail-template.vue, detailLayout.js
- Source session: 22342137-7680-4a86-9ec8-e4647eb82f33; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：22342137-7680-4a86-9ec8-e4647eb82f33


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "detail_collapse_label_left",
  "source_extraction_id": "e5022fce1d6e4a71b2e61d2235605578",
  "version": 1,
  "memory_type": "entities"
}
-->
