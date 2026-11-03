# 保障房G Tencent Map Key Loading and Security Proxy
In 保障房G (zhi2-web-admin), Tencent Map Keys are uniformly read from system parameters and routed through a security proxy to avoid hardcoding and frontend exposure.

## Problem Background
- Hardcoding map Keys hurts unified configuration and maintenance, and a directly-connected GL JS Key would be exposed in the frontend page and requests.

## Solution
- Added src/utils/mapKey.js fetching the Key from /system/config/getByKey/sys.config.map.key, providing cached getMapKey() and loadTencentMapScript().
- Removed the Tencent Map script tag from index.html; mapLoader.js now calls loadTencentMapScript() to load the SDK.
- Before loading gljs, set window._TMapSecurityConfig.serviceHost to /_TMapService and strip &key=xxx from the URL.
- Added getTMapWsUrl() to proxy WebService requests; commuteDialog.vue and markMap.vue switched from mapKey/getMapKey() to getTMapWsUrl().
- vite.config.js proxies /_TMapService and /_TMapService_ws instead of the original /map proxy.

## Verification and Attribution
- Evidence: src=保障房G/001.md; source=cursor session=cafeb002-fbae-47a3-861d-f9f0d1ad95f1.
- Files: src/utils/mapKey.js, vite.config.js, ZsTencentMap/mapLoader.js, ZsTencentMap/index.vue, commuteDialog.vue, markMap.vue, index.html, Map/index.vue, src/main.js, LoginForm.vue.
- Project: 保障房G (zhi2-web-admin); source sessions: 1a4ee6c3-daea-476a-ba1b-6b0b105cdce0, cafeb002-fbae-47a3-861d-f9f0d1ad95f1; code baseline: none.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "tmap_key_proxy",
  "source_extraction_id": "1f709bbcee23483190fdecbab223b909",
  "version": 1,
  "memory_type": "entities"
}
-->