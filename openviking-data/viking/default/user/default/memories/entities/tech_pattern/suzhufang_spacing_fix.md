# SuzhaoFang list spacing inconsistent and Chinese house name early wrap
In SuHousingC, `Project_Suzhufang.vue` list container padding differed from new/second-hand house, and `houseCard.vue` Chinese name wrapped early, fixed in cursor session bd5fe3c1.

## Root Cause
- `Project_Suzhufang.vue` list container left/right padding was 10px, inconsistent with 12px in new/second-hand house
- `houseCard.vue` `.house-name` used `-webkit-line-clamp:2` + `word-break:keep-all` causing Chinese early wrap

## Fix Summary
- Changed `.list-wrap` padding to 12px
- Changed `.house-name` to single-line ellipsis with overflow hidden

## Involved Files
- src/components/commonNew/houseCard.vue
- src/pages_transaction/stockHouse/index.vue
- src/pages_tab/components/Project_Suzhufang.vue
- src/pages_transaction/newHouse/index.vue
- src/pages_transaction/newHouse/indexMore.vue

## Verification & Ownership
- Verification: extracted source=cursor session=bd5fe3c1-7ddd-4ce0-9f21-65bd212a15fb
- Project: SuHousingC (zhi2-mobile-shimin); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "suzhufang_spacing_fix",
  "source_extraction_id": "acdba844708c44c785cf6dd486be2845",
  "version": 1,
  "memory_type": "entities"
}
-->