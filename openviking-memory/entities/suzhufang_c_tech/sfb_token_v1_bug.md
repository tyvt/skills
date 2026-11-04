# SFB login only stored V2 token missing V1 swap
SuZhuFang C SFB login logic only saved V2 token without swapping for V1 token, causing apiV1 requests depending on V1 token to fail.

## Symptoms and Root Cause
- After SFB login, interfaces requiring V1 token failed
- App.vue initSfbUser only saved V2 token, did not call getTokenV1() to obtain V1 token
- userStore.tokenV1 was not written, apiV1 requests lacked authentication

## Solution
- Immediately call getTokenV1() after setting V2 token in initSfbUser and write result to userStore.tokenV1
- Ensure subsequent apiV1 requests carry correct V1 token

## Verification and Attribution
- Verification evidence: src=苏住房C/064.md
- Involved files: src/App.vue, src/store/user.js, src/api/maintenance.js, src/api/security.js, src/pages/redirect/index.vue, src/api/index.js, src/api/v1Instance.js, src/pages/login/index.vue
- Project: SuZhuFang C; source session: cf09ca87-b417-43c0-b05d-5168f3aa3e55; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "suzhufang_c_tech",
  "name": "sfb_token_v1_bug",
  "source_extraction_id": "0424bc6fcd5a49b3a343fdf938f08ef6",
  "version": 1,
  "memory_type": "entities"
}
-->