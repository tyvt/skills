---
audit_status: invalid
last_checked: 2026-11-26T19:21:52+08:00
verdict_note: 产品2.0 zs-import.vue 无 silentSuccess prop，且该仓无 ReportImportDialog.vue，月度导入 toast 记忆描述与现状不符。
---
- Prefers monthly report import success feedback as a single top-placed message (offset 80) to avoid overlap with dialog: add `silentSuccess` prop to `zs-import.vue` to suppress default `msgSuccess`, set `:silent-success="true"` and `:auto-close="false"` on `ReportImportDialog.vue`, and emit `this.$message({ offset: 80 })` from detail.vue.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "monthly_import_toast",
  "source_extraction_id": "a864548ad03b47afb5c403ee29cea29c",
  "version": 1,
  "memory_type": "preferences"
}
-->