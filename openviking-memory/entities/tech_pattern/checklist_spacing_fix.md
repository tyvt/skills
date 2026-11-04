# Global style forced zero margin caused elevator options sticking
In SuHousingC, global `uni.scss` forced `.checklist-box` zero margin, causing `step1.vue` elevator options no spacing, fixed in cursor session f19a79a2.

## Root Cause
- Global `uni.scss` set `.checklist-box` `margin-right:0 !important`
- Mini-program `gap:32rpx` ineffective, causing `step1.vue` elevator options no spacing

## Fix Summary
- Added `margin-right:32rpx !important` for non-last options in `step1.vue`

## Involved Files
- src/pages_guard/guardApply/components/step1.vue
- src/pages_guard/guardApply/index.vue
- src/pages_guard/guardApply/components/step2.vue
- src/pages_guard/housingInformation/index.vue
- src/styles/radio.scss
- src/uni.scss
- src/pages_owner/authentication/components/PropertyAdd.vue
- src/pages_transaction/buyHouse/index.vue

## Verification & Ownership
- Verification: extracted source=cursor session=f19a79a2-7549-477c-9068-dfc6f1414d26
- Project: SuHousingC (zhi2-mobile-shimin); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "checklist_spacing_fix",
  "source_extraction_id": "acdba844708c44c785cf6dd486be2845",
  "version": 1,
  "memory_type": "entities"
}
-->