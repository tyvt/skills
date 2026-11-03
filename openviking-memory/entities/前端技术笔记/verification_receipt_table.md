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