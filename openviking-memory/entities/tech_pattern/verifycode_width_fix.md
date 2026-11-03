# Missing width:100% on code components breaks phone-change alignment
In the zhi2-mobile-shimin mobile project (Su Zhu Fang C), the ImgCode and VerifyCode components on the phone-change page lacked width:100% styling, causing the graphic captcha and "Get Code" button right edges to misalign.

## Root Cause
- ImgCode and VerifyCode in zhi2-mobile-shimin/src/pages_my/setting/phone.vue lacked width:100% styling
- Caused the graphic captcha and "Get Code" button right edges to misalign on the phone-change page

## Solution
- Added style="width: 100%" to components to align with login and account-cancellation form standards

## Verification and Attribution
- Verification evidence: src=components/001.md
- Involved files: zhi2-mobile-shimin/src/pages_my/setting/phone.vue, src/pages/login/forget.vue, src/pages.json, src/pages/login/password.vue, src/components/VerifyCode/index.vue, src/components/shared/PhoneForm.vue, src/components/ImgCode/index.vue, src/pages_main/login/forget.vue
- Project: Su Zhu Fang C (zhi2-mobile-shimin); Source session: 75a1033e-1d37-4ff3-873c-e61128fd7787; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "verifycode_width_fix",
  "source_extraction_id": "586de8e639fc48e0983e0db56311b1a6",
  "version": 1,
  "memory_type": "entities"
}
-->