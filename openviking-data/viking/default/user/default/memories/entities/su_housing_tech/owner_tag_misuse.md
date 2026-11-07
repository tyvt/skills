# Contact owner area UI broken due to avatar tag misuse
In the 苏住房C mobile end, the bottom "contact owner" area avatar used an HTML tag unsupported by the mini program, causing layout breakage.

## Root Cause
- The bottom "contact owner" area avatar used an HTML tag unsupported by the mini program
- This caused layout breakage

## Solution
- Switch to `<image>` or `<view>` and constrain the dimensions

## Verification and Attribution
- Evidence: src=cursor session=3c86796a-b65f-466f-a1d2-266feae580a5
- Files: pages_transaction/stockHouse/detail.vue, components/ZsImage/ZsImage.vue, pages_transaction/stockHouse/agentDetail.vue, uni.scss, pages.json
- Project: 苏住房C (zhi2-mobile-shimin); source session: 3c86796a-b65f-466f-a1d2-266feae580a5; code baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：3c86796a-b65f-466f-a1d2-266feae580a5


<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "owner_tag_misuse",
  "source_extraction_id": "f6f7117455e04147ae37599394ce9255",
  "version": 1,
  "memory_type": "entities"
}
-->
