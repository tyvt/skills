# pages_my subpackage route missing causes page not found
The Vue file `pages_my/setting/userInfo` exists but was not registered in the `pages_my` subpackage of `pages.json`, causing the mini-program to report `page not found`.

## Description
- `pages_my/setting/userInfo.vue` file exists but the `pages_my` subpackage pages array in `pages.json` lacks its route
- Mini-program throws `page not found` on navigation to the page
- `setting/realInfo` (real-name info) route was also missing from `pages.json`

## Solution
- Register `setting/userInfo` (title "Personal Info") route in `pages.json`
- Register `setting/realInfo` (title "Real-name Info") route in `pages.json`

## Verification
- Source evidence: src=苏住房C/074.md
- Files: pages.json; pages_my/setting/userInfo.vue; pages_my/setting/realInfo.vue; pages_my/setting/index.vue; My_Suzhufang.vue
- Project: Suzhou Housing C (zhi2-mobile-shimin); code baseline: none; session: 4cc33d41-1cbc-4887-bc8a-15d1fdcc8a0e

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：4cc33d41-1cbc-4887-bc8a-15d1fdcc8a0e


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "pages_my_route_missing",
  "source_extraction_id": "ba71f747db594776be8a6b89cd514edd",
  "version": 1,
  "memory_type": "entities"
}
-->
