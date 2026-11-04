# uni-easyinput Focus Prop Misuse
In zhi2-mobile-shimin, uni-easyinput has no focus() method; focus is a boolean prop, misuse caused t.call is not a function.
## Root Cause
- uni-easyinput lacks focus() method; focus is boolean prop, calling it threw t.call is not a function
## Solution
- In ImgCode, bind :focus to inputFocus and toggle via nextTick to achieve focus
## Involved Files
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/login/index.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ImgCode/index.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/hooks/useSubmitLock.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/security.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/shared/PhoneForm.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/publishHouse/verification.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/index.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/add.vue
## Verification
- Extracted from cursor session ab7bb862-0a23-40aa-ab1b-fe4173708a80


<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "unieasyinput_focus_prop",
  "source_extraction_id": "7a270ac54cdf4f2198345f3e4a7aa892",
  "version": 1,
  "memory_type": "entities"
}
-->