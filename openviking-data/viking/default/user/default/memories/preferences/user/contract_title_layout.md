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