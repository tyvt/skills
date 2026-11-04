# Info page module spacing 20rpx not unified to 10px
In SuHousingC mobile, several info pages used 20rpx module spacing inconsistent with baseCard's 10px rule, fixed in cursor session a98e9087.

## Root Cause
- Some info pages used 20rpx module spacing, inconsistent with `.base-card + .base-card` 10px rule

## Fix Summary
- Changed spacing to 10px in 6 pages like `project/info/index.vue` (`mt-20`→`module-gap` or `20rpx`→`10px`)

## Involved Files
- src/pages_owner/project/info/index.vue
- src/pages_owner/company/info/contracts.vue
- src/pages_owner/company/info/index.vue
- src/pages_owner/committee/info/index.vue
- src/pages_owner/subdistrict/info/index.vue
- src/pages_owner/community/info/index.vue
- src/pages_owner/house/components/ProjectDetail.vue
- src/pages.json

## Verification & Ownership
- Verification: extracted source=cursor session=a98e9087-2a10-4769-bbf6-6e47eb7b7590
- Project: SuHousingC (zhi2-mobile-shimin); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "info_spacing_fix",
  "source_extraction_id": "acdba844708c44c785cf6dd486be2845",
  "version": 1,
  "memory_type": "entities"
}
-->