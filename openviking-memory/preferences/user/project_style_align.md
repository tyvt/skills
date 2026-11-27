---
audit_status: invalid
last_checked: 2026-11-27T12:34:20+08:00
verdict_note: 源码中 pages_maintain_project/project.vue 不存在（n=0），仅记忆/归档提及；project.vue 与 apply.vue 样式同步无代码证据。
---
- `src/pages_maintain_project/project.vue` must sync CSS with `apply.vue` as baseline: background `#efefef`→`#f7f7f7`, card padding `28rpx 30rpx`, title adds `margin-bottom:24rpx`, line spacing `.row+.row{margin-top:12rpx}`.
- Keep `.phase` specific color style intact.
- Verification: extracted source=cursor session=1d2913da-ba61-4601-8826-ca51ff7f311d.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "project_style_align",
  "source_extraction_id": "1347c22671b64dc1a595c525039a2a5f",
  "version": 1,
  "memory_type": "preferences"
}
-->