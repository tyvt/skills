---
audit_status: valid
last_checked: 2026-11-27T05:01:53+08:00
verdict_note: 小程序/惠山二期H5 externalWebview.vue 实存 requestProfile；getCurrentToken/requestHeader 写法在代码中可查，与 token 兜底偏好一致。
---
- In `pages/webview/externalWebview.vue`, `requestProfile(token)` should use `token || this.getCurrentToken()` to obtain `currentToken` and dynamically assemble `requestHeader`, avoiding `uni.request` carrying an invalid `Bearer`.

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "extwebview_token_fallback",
  "source_extraction_id": "74400517991b4f5fbc932da6d5306cd6",
  "version": 1,
  "memory_type": "preferences"
}
-->