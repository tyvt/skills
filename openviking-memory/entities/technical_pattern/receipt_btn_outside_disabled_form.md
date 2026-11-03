# Receipt Button Outside Disabled Form
In SuzhouHousingG `pubBankReceiptApply` detail page, buttons inside disabled form were unclickable in view mode.
## Root Cause
- Query and get receipt detail buttons located inside disabled form, so in view mode they were not clickable, detail list not shown.
## Fix
- Move buttons out of disabled form.
## Involved Files
- `src/views/benefit/pubBankReceiptApply/detail.vue`, `components/detailTable.vue`
- `src/api/benefit/pubBankReceiptApply.js`, `src/api/benefit/pubBankReceiptDetail.js`
- `src/mixins/detailMixins.js`, `src/views/benefit/pubVerificationReceipts/detail.vue`, `src/mixins/form.js`, `src/components/zs-button/zs-button.vue`
## Verification
- Source: 苏住房G/062.md; session 765750a0-13d8-4789-8d78-9bb82bdf1e1f.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "receipt_btn_outside_disabled_form",
  "source_extraction_id": "fcb70580f7074a5e8c518d8c5fbf82b4",
  "version": 1,
  "memory_type": "entities"
}
-->