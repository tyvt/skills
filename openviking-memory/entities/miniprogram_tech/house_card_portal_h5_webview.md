# House card uses portalH5Webview
After login, house card display relies on a new portal-h5-webview.js wrapper and a fullscreen portalH5Webview.vue web-view.

## Description
- New utils/portal-h5-webview.js wraps H5 root address, hash route concatenation, and param merge (removing miniRoute)
- pages/webview/portalH5Webview.vue renders a fullscreen <web-view> that reads miniRoute in onLoad
- This aligns with original externalWebview logic for house card display after login

## Purpose
- Centralize H5 web-view addressing and routing for house cards
- Keep miniRoute handling consistent with prior externalWebview behavior

## Verification
- Verification evidence: src=小程序/002.md
- Files: utils/portal-h5-webview.js, pages/webview/portalH5Webview.vue, pages/user/index/index.vue, pages/webview/externalWebview.vue, utils/portal-user.js, pages.json, components/custom-tabbar/custom-tabbar.vue
- Project: 小程序 (wygl-wxxcx-dev-slh); Source session: 5c68c6ac-0836-4b0f-83d0-9a13e307e434; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "miniprogram_tech",
  "name": "house_card_portal_h5_webview",
  "source_extraction_id": "71711547f6984c3c811af6b30fdf76a0",
  "version": 1,
  "memory_type": "entities"
}
-->