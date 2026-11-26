---
audit_status: invalid
last_checked: 2026-11-26T21:45:31+08:00
verdict_note: 全仓无 CONTRACT_PAYMENT_NOTE/title-text/TransactionDetailTable，偏好记忆涉及的代码符号均无法证实。
---
- 偏好合同缴款（`CONTRACT_PAYMENT_NOTE`）详情页单层 Tab 时不使用只有一个「交易明细」的 `zs-tabs`，直接渲染 `TransactionDetailTable` 并设置 `title-text="交易明细"`，与上方 `Headline` 风格统一，避免 Tab 小标题 + Headline 大标题两套样式。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "详情页单层Tab标题样式",
  "source_extraction_id": "369869e7cadd4c7692bb09c62a15bfe2",
  "version": 1,
  "memory_type": "preferences"
}
-->