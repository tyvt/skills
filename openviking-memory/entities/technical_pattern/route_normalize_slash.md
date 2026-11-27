---
audit_status: invalid
last_checked: 2026-11-28T02:27:43+08:00
verdict_note: normalizeLegacyPageUrl 与 utils/route-map.js 全仓源码不存在；苏住房C house/index.vue 仍使用 goto(`TypeChoose?...`) 相对路径。所述修复未在代码中体现，描述与现状不符。
---
# relative path normalized to slash causes page not found
The "Add" button in `pages_owner/house/index.vue` used relative path `TypeChoose?...`; `normalizeLegacyPageUrl` in `utils/route-map.js` only prepends a leading slash for non-`/` paths, resolving to `/TypeChoose` and causing `navigateTo:fail page not found`.

## Description
- `pages_owner/house/index.vue` "Add" button used relative path `TypeChoose?...`
- `utils/route-map.js` `normalizeLegacyPageUrl` only prepends a leading slash for non-`/` paths
- Resolved to `/TypeChoose` which is not a valid page, causing `navigateTo:fail page not found`

## Solution
- `goto` calls must pass absolute subpackage paths, avoiding relative path usage
- Avoid relative path usage in navigation calls

## Verification
- Source evidence: src=苏住房C/074.md
- Files: pages_owner/house/index.vue; utils/index.js; pages_owner/house/owner/success.vue; utils/route-map.js; pages_owner/house/TypeChoose.vue; pages.json; UnauthorizedPage.vue
- Project: Suzhou Housing C (zhi2-mobile-shimin); code baseline: none; session: d7258436-2f74-40b3-a7d1-bb994d1239c1

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：d7258436-2f74-40b3-a7d1-bb994d1239c1

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "route_normalize_slash",
  "source_extraction_id": "ba71f747db594776be8a6b89cd514edd",
  "version": 1,
  "memory_type": "entities"
}
-->