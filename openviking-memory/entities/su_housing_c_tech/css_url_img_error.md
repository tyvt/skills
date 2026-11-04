# CSS Background url() Mistaken as img src Causes Load Failure
In Su Zhu Fang C (zhi2-mobile-shimin), detail.vue mistakenly used the CSS url() returned by makeWatermark() as an <img> relative path, causing a 500 load error. Fixed by changing the watermark layer to a <view> using backgroundImage and background-repeat: repeat.

## Root Cause
- detail.vue mistakenly used the CSS url("data:image/svg+xml,...") returned by makeWatermark() as an <img> relative path, causing a 500 load error

## Solution
- Changed the watermark layer to a <view> using backgroundImage and background-repeat: repeat

## Involved Files
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/announcement/detail.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/route-map.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/announcement/detail.vue
- detail.vue

## Verification and Attribution
- Verification evidence: extracted source=cursor session=c1c2be72-6443-4d0a-8960-b97194bec465
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "css_url_img_error",
  "source_extraction_id": "3cbdf3040fb54620be57d598c520b61e",
  "version": 1,
  "memory_type": "entities"
}
-->