# Simulator face verify no wechat verify call
`uni.startFacialRecognitionVerify` in WeChat simulator usually hits the fail callback; only success requests `/security/ctAuth/wechat/verify`, so simulator tests show no such request and pop auth failure.

## Behavior
- In WeChat simulator, `uni.startFacialRecognitionVerify` typically goes to the fail callback
- Only the success callback triggers a request to `/security/ctAuth/wechat/verify`
- Simulator testing therefore has no `wechat/verify` request and shows authentication failure

## Real Device
- Real-device miniprogram triggers the `wechat/verify` call only after completing face verification

## Verification
- Verification evidence: src=苏住房C/075.md
- Files: src/api/security.js, pages_my/verification/FormLocal.vue, pages_my/verification/FormNonLocal.vue, utils/index.js, pages_my/verification/FormManual.vue, utils/constant.js, src/api/index.js
- Project: 苏住房C (zhi2-mobile-shimin); Source session: 13ed1683-e44e-4216-95c3-4499d21022e8; Baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：13ed1683-e44e-4216-95c3-4499d21022e8


<!-- MEMORY_FIELDS
{
  "category": "miniprogram_tech",
  "name": "simulator_face_verify_no_wechat_verify",
  "source_extraction_id": "4d965ebf3ffa4b8f93d66ff8f7daff3d",
  "version": 1,
  "memory_type": "entities"
}
-->
