
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