# Cloud guard stat bar misaligned due to white-bg icon layout error
In SuHousingC, `pages_guard/index/index.vue` stat bar right side misaligned because of white-bg icon layout error, fixed in cursor session 20dc5c80.

## Root Cause
- After moving user info into blue header per design, stat bar right misaligned color block caused by `white-bg` + `icon_tip_bg.png` layout error
- Avatar depends on subpackage static asset `pages_guard/static/images/default-avatar-gary.png` which must exist

## Fix Summary
- Replaced misaligned color block with simple text
- Ensured avatar static asset exists

## Involved Files
- src/pages_guard/index/index.vue
- src/pages_guard/index/components/guard-info-card.vue
- src/components/ZsImage/ZsImage.vue
- src/utils/index.js

## Verification & Ownership
- Verification: extracted source=cursor session=20dc5c80-9b0a-48c5-8cb6-1378ef6459c6
- Project: SuHousingC (zhi2-mobile-shimin); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "guard_stat_fix",
  "source_extraction_id": "acdba844708c44c785cf6dd486be2845",
  "version": 1,
  "memory_type": "entities"
}
-->