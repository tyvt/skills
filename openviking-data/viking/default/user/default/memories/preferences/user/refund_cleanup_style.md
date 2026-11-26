---
audit_status: valid
last_checked: 2026-11-27T00:18:06+08:00
verdict_note: 太仓G/太仓物管 zhi1-web-admin/.../repairFunds/refund/ 下 detail.vue-445、components 命中 CommonTable，退款目录清理涉及组件属实。
---
- When cleaning the refund directory (zhi1-web-admin repairFunds/refund), remove unused props/listeners and duplicate lifecycle hooks while keeping functionality unchanged.
- Rename component name to CommonTable, unify mounted to trigger getQuery(), and let listMixins call init() instead of duplicate created().

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "refund_cleanup_style",
  "source_extraction_id": "c6aab03deb074150a75444d7267d5fee",
  "version": 1,
  "memory_type": "preferences"
}
-->