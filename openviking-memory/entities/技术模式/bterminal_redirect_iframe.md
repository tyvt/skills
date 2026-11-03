# bTerminalRedirect iframe view pool
bTerminalRedirect tab keep-alive uses an iframe view pool (v-show persistent DOM) instead of Vue keep-alive.

## Description
- bTerminalRedirect tab keep-alive uses an iframe view pool with v-show to keep iframes resident in DOM
- Chosen over Vue keep-alive to preserve iframe state across tab switches

## Solution
- src/utils/innerLink.js adds isBTerminalRedirectRoute and isIframePoolRoute
- src/utils/bTerminalRedirect.js extracts fetchBTerminalIframeSrc
- src/store/modules/permission.js sets meta.bTerminalRedirect = true
- AppMain.vue, iframeToggle/index.vue, layout/index.vue, tagsView.js, InnerLink/index.vue integrate the pool

## Verification and source
- Verified in src=无锡市区G/003.md
- Project: zhi2-web-admin (无锡市区G); source session: 47301bc4-8faf-4838-b33c-54afa184fa11; code base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_redirect_iframe",
  "source_extraction_id": "40792cbb3ad5438f821dc9122a29aca7",
  "version": 2,
  "memory_type": "entities"
}
-->