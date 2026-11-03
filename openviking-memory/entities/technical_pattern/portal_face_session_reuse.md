# Portal face verification session reuse within 5 minutes
Portal chain (verify→bdc→不动产) after face success skips re-verification within 5 minutes via `isSfbFaceRecentlyVerified()`.

## Description
- Huishan `zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceSession.js` exports `SFB_FACE_VERIFY_SESSION_MAX_AGE_MS=5*60*1000` and session management methods
- After Lingxi house selection binding, external voting H5 opens directly without the face page

## Verification
- Verification: src=惠山二期H5/003.md
- Files: zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/decision/form.vue, src/pages_owner/elect/form.vue, src/pages.json, src/pages_owner/decision/components/multiple/ViewOptionsList.vue, src/api/autonomy.js, src/pages_owner/house/index.vue, 无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js, src/hooks/usePortal.js
- Project: 惠山二期H5 / 无锡市区小程序嵌入H5; Source session: dfbbf465-c764-4a09-b414-4083bef5f5d2; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "portal_face_session_reuse",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 1,
  "memory_type": "entities"
}
-->