# Face verify needs webview ready
face.vue must call startFacialRecognitionVerify only after web-view is ready, or it fails with "fail webview not ready".

## Problem
- Calling startFacialRecognitionVerify in onLoad of pages/face/face.vue fails because web-view is not ready
- Error message: fail webview not ready

## Fix
- Move the call to onReady with a 300ms delay
- Retry up to 3 times on "webview not ready" with 500ms interval
- If still failing, show "启动失败" (startup failed) prompt

## Verification
- Verification evidence: src=小程序/002.md
- Files: pages/face/face.vue, pages/face/verify.vue, pages/face/bdc.vue, login/login/choose/choose.vue, pages/home/new/index.vue, pages/active/active.vue, uni_modules/uview-ui/libs/function/md5.js, pages.json
- Project: 小程序 (wygl-wxxcx-dev-slh); Source session: f3266edb-f8f0-4d5e-9fbf-b55ae9f2fdac; Baseline: none

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 来源会话：f3266edb-f8f0-4d5e-9fbf-b55ae9f2fdac


<!-- MEMORY_FIELDS
{
  "category": "miniprogram_tech",
  "name": "face_verify_webview_ready",
  "source_extraction_id": "71711547f6984c3c811af6b30fdf76a0",
  "version": 1,
  "memory_type": "entities"
}
-->
