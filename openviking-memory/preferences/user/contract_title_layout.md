---
audit_status: valid
last_checked: 2026-11-27T01:49:07+08:00
verdict_note: 苏州市房地产监测V3 contract/index.vue 真实源码含 s16-main__title，与预售合同标题布局偏好描述一致。
---
- Prefer moving the presale contract title out of the left catalog (`s16-side`) to the left side of the right operation bar.
- In `src/views/contract/index.vue`, remove the `s16-side` title and add `s16-main__title` + `s16-main__actions` inside `s16-main__bar`.
- In `sz-contract.scss`, set a left-right layout and hide `OperationBtnGroup`'s `.page-title` to prevent duplication; add catalog-area whitespace in `SzNav.vue`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "contract_title_layout",
  "source_extraction_id": "bcc5eb16dfe3422e81daada6b8ca98b0",
  "version": 1,
  "memory_type": "preferences"
}
-->