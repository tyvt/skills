# Login page subpackage migration old path jump
pages/login moved to pages_main/login with new pages.json registration, but old jump paths caused page not found; unified to new path.
## Root cause
- Login page relocated from pages/login to pages_main/login; pages.json registered new route.
- Multiple code locations still navigated to legacy '/pages/login/index', triggering page not found.
## Solution
- Updated all navigation targets to '/pages_main/login/index' including src/utils/index.js, route-map.js, redirect/index.vue, FormLocal.vue.
- Adjusted migrate-pages-tab.mjs and component files accordingly.
## Verification
- Source session 73f5531d-ca8f-4227-9e76-d2fa4b5c98a1; baseline none; from 苏住房C/062.md.
- Involved files: pages.json, migrate-pages-tab.mjs, pages/login/index.vue, pages_main/login/index.vue, utils/index.js, route-map.js, redirect/index.vue, FormLocal.vue.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：73f5531d-ca8f-4227-9e76-d2fa4b5c98a1


<!-- MEMORY_FIELDS
{
  "category": "suzhou_housing_tech",
  "name": "login_page_migration",
  "source_extraction_id": "bf93ed7583b04cdc899775f3a7eb2b15",
  "version": 1,
  "memory_type": "entities"
}
-->
