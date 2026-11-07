# zs-dialog scroll mode causes content clipping on specific branch
On branch develop/v2.6.2-suzhufang, the zs-dialog--scrollable commit causes dialog content to be clipped with no scrolling, while the old branch works fine.

## Root Cause
- Only branch develop/v2.6.2-suzhufang contains the zs-dialog--scrollable commits (4defa2128, 4879d1d31), changing scroll behavior
- The older develop/v2.6.2 uses .form-box with overflow:auto and has no clipping issue
- Branch commit isolation leads to divergent scroll logic

## Verification and Scope
- Verification: src=苏住房G/064.md
- Files: zhi2-web-admin/src/views/system/menu/index.vue, zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- Project: 苏住房G; Source session: 17392583-56a4-49a0-82fb-430a5f1aadfe; Code baseline: none

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：17392583-56a4-49a0-82fb-430a5f1aadfe


<!-- MEMORY_FIELDS
{
  "category": "suzhufang_g_tech_pattern",
  "name": "zs_dialog_scroll_branch",
  "source_extraction_id": "bef229ef9efa47e0b71ee6b556779111",
  "version": 1,
  "memory_type": "entities"
}
-->
