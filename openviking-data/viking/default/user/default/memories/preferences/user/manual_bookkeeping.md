- In `depositNotice/components/detail.vue` and `company/components/detail.vue`, the manual bookkeeping button `canManualBookkeeping` shows only when: view mode, `bizState == '2'`, `depApplicationState == '0'`, `isAdditionalRecord != '1'`, and at least one of `noticeNo`/`noticeNumber`/`noticeApplicationNo` exists.
- In `manualBookkeeping.js`, when passing notice number param, add `noticeApplicationNo` as fallback.
- Amount priority: prefer `payableTotalAmount`, then `depMoneySum`, etc.
- Verification: src=泰兴G/001.md; project: 泰兴G (zhi2-web-admin); source session 01a167be-dcc3-764e-99b7-4279950a2042; code baseline none.
- Involved files: depositNotice/individual/detail.vue, depositNotice/components/detail.vue, depositNotice/components/manualBookkeeping.js, depositRegister/detail.vue, depositNotice/company/components/detail.vue.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "manual_bookkeeping",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 1,
  "memory_type": "preferences"
}
-->