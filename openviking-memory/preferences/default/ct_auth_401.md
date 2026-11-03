
- In `utils/portal-user.js`, `requestCtAuth` on HTTP 401 must call `handleCtAuthUnauthorized`: run `clearPortalStorage()` to clear `__ew_external_webview_ct_token__` and `__ew_external_webview_portal__`, broadcast `portal-auth-expired`, and exclude `/wechat/login` to avoid false prompts.


<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "ct_auth_401",
  "source_extraction_id": "74400517991b4f5fbc932da6d5306cd6",
  "version": 1,
  "memory_type": "preferences"
}
-->