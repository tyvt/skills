# Miniprogram window.scrollTo anchor failure
Root cause: `pages_transaction/newHouse/detail.vue`'s `setTab` uses H5-only API `window.scrollTo`; WeChat miniprogram has no `window` object, causing an error.

## Root Cause
- `setTab` in `pages_transaction/newHouse/detail.vue` calls H5-only `window.scrollTo`
- WeChat miniprogram lacks a `window` object, so the call errors and anchor navigation fails

## Fix
- Use `uni.createSelectorQuery()` and `uni.pageScrollTo()` for cross-platform scrolling
- Unify anchor class names (add `md0`, change `md3` to `md6` to match tab value)

## Verification
- Verification evidence: src=苏住房C/079.md
- Files: pages_transaction/newHouse/detail.vue, pages_transaction/stockHouse/detail.vue, pages_main/automaticRobot/index.vue, utils/index.js
- Project: 苏住房C; Source session: 41a4e64f-0b65-4969-b0c2-d0d6514d2d0c; Baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：41a4e64f-0b65-4969-b0c2-d0d6514d2d0c


<!-- MEMORY_FIELDS
{
  "category": "miniprogram_tech",
  "name": "miniprogram_window_scrollto_anchor_fail",
  "source_extraction_id": "4d965ebf3ffa4b8f93d66ff8f7daff3d",
  "version": 1,
  "memory_type": "entities"
}
-->
