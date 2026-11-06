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