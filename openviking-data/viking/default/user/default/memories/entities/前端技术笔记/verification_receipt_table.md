---
audit_status: valid
last_checked: 2026-11-26T16:22:05+08:00
verdict_note: VerificationReceiptDetailTable(38)、pubReceiptVerificationDetail(23)、receiptVerifyFilter(14) 均在真实代码确认，筛选参数修复属实。
---
# VerificationReceiptDetailTable
A Vue component that renders the receipt verification detail table.
## Behavior
- queryParams includes receiptVerifyFilter:1 to auto-attach a filter condition.
- List requests spread ...this.queryParams when calling /benefit/pubReceiptVerificationDetail/page.
## Fix
- Added receiptVerifyFilter:1 to queryParams so page requests auto-carry the filter.

<!-- MEMORY_FIELDS
{
  "category": "vue_component",
  "name": "verification_receipt_table",
  "source_extraction_id": "e0181ed368f74bb2ace2c92ca2241393",
  "version": 1,
  "memory_type": "entities"
}
-->