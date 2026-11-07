# Visible menu count must use .top-nav actual width excluding left padding
Visible menu count calculated by full .top-nav-container width miscounts 1~2 items, and nav-items-scroll overflow-x: auto makes clipped items still visible.

## Root Cause
- Visible menu count uses .top-nav-container full width (including 276px left padding) causing 1~2 extra items
- .nav-items-scroll sets overflow-x: auto making clipped items still visible and clickable

## Solution
- Calculate by .top-nav actual width and reserve 180px for "More"
- Change menu area to overflow: hidden
- Add ResizeObserver to recalc on width change, move overflow items into "More"

## Verification and Attribution
- Evidence: src=产品2.0/038.md
- Files: zhi2-web-admin/src/layout/components/Navbar.vue, layout/index.vue, Sidebar/index.vue, AppMain.vue, store/modules/app.js
- Project: Product 2.0
- Source session ID: 97dd3a0f-1563-44f7-9957-aea69e5270ca
- Code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：97dd3a0f-1563-44f7-9957-aea69e5270ca


<!-- MEMORY_FIELDS
{
  "category": "product2_tech",
  "name": "menu_visible_count",
  "source_extraction_id": "3c9ed998705f417e8c48593f229edd2c",
  "version": 1,
  "memory_type": "entities"
}
-->
