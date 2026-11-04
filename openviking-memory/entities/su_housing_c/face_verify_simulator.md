# Face verify simulator fails not trigger wechat/verify
Simulator's uni.startFacialRecognitionVerify usually goes fail callback, only success requests /security/ctAuth/wechat/verify.

## Behavior
- `uni.startFacialRecognitionVerify` in WeChat simulator usually takes fail callback, only success requests `/security/ctAuth/wechat/verify`
- Simulator test has no such request and pops auth failure
- Real device miniprogram triggers `wechat/verify` call only after completing face verify

## Verification
- Verification evidence: src=苏住房C/075.md
- Involved files: d:\repository\苏住房C\zhi2-mobile-shimin\src\api\security.js ; d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\verification\FormLocal.vue ; d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\verification\FormNonLocal.vue ; d:\repository\苏住房C\zhi2-mobile-shimin\src\utils\index.js ; d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\verification\FormManual.vue ; d:\repository\苏住房C\zhi2-mobile-shimin\src\utils\constant.js ; d:\repository\苏住房C\zhi2-mobile-shimin\src\api\index.js
- Source session: 13ed1683-e44e-4216-95c3-4499d21022e8; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c",
  "name": "face_verify_simulator",
  "source_extraction_id": "356d1858e539467da8dfffd82a8f6bf9",
  "version": 1,
  "memory_type": "entities"
}
-->