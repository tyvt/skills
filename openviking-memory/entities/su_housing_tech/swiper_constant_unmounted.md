# swiperComponent.vue constant unmounted error
In the 苏住房C mobile `swiperComponent.vue` using Options API, the top-level `playIcon` and `closeIcon` were not mounted to the component instance, so template `:src="playIcon"` access threw an error.

## Root Cause
- `swiperComponent.vue` uses the Options API
- Top-level `playIcon` and `closeIcon` were not mounted to the component instance
- Template access via `:src="playIcon"` threw an error

## Solution
- Move `playIcon` and `closeIcon` into the `data()` return value to mount them on the instance

## Verification and Attribution
- Evidence: src=cursor session=eb88fc33-134b-41f2-b2d5-78dd948cbb83
- Files: src/components/commonNew/swiperComponent.vue, src/pages/commonNew/swiperComponent.vue
- Project: 苏住房C (zhi2-mobile-shimin); source session: eb88fc33-134b-41f2-b2d5-78dd948cbb83; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "swiper_constant_unmounted",
  "source_extraction_id": "f6f7117455e04147ae37599394ce9255",
  "version": 1,
  "memory_type": "entities"
}
-->