# Owner card w-500 truncates and background occludes text
In 苏住房C (zhi2-mobile-shimin), the electronic owner card truncated long community names and its decorative background layer covered the text.

## Root Cause
- Community name used w-500 (500rpx) which truncated long text
- Decorative background layer had a higher z-index than the text area, causing occlusion

## Solution
- Remove w-500 and use padding-right:160rpx instead
- Wrap text in info-card-content with z-index:1
- Add word-break:break-all for long text

## Verification and Attribution
- Evidence: src=cursor session=5a765087-11ff-4a31-9326-3d3a3b8980b1
- Files: pages_owner/ownerCard/index.vue, pages_guard/index/index.vue, pages_owner/tenant/index.vue, pages_owner/house/components/TypeChoose_Suzhufang.vue, pages_owner/house/index.vue
- Project: 苏住房C (zhi2-mobile-shimin); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_card_w500_truncate",
  "source_extraction_id": "5edfa1599d644844a125308dfde52d91",
  "version": 1,
  "memory_type": "entities"
}
-->