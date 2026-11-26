---
audit_status: invalid
last_checked: 2026-11-26T10:36:55+08:00
verdict_note: 记忆称全局已移除 zs-table-column width；产品2.0/src 仍大量含 width/-width（grep 多文件命中），与「已移除」不符。
---
- 全局 `src` 下 `zs-table-column`（445处）、`zs-operate-column`（73处）移除 `width` 及 `:width` 列宽绑定属性，`zs-select-column` 保留1处未动。
- 操作列无序号列逻辑，仅清理列宽，保留 `slot-width` 等非列宽属性。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zs列组件移除width绑定规范",
  "source_extraction_id": "546275cea60345d0accb2c916598cd00",
  "version": 1,
  "memory_type": "preferences"
}
-->