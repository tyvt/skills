- Vue 2 (`vite:vue2`) does not allow `:key` on `<template v-for>`; `key` must be placed on a real DOM node.
- In `AppendixRequirementGrid.vue`, remove `:key` from `<template v-for>`; the menu row `<p>` and card row `<div>` each bind `:key`; the card container uses `v-else` paired with `v-if="item.isMenu"` to avoid rendering dual nodes in the same loop.
- Verification: src=苏州市房地产监测V3-leftover/015.md; project: 苏州市房地产监测V3 (zhi2-web-admin); source session 4f2bea14-4e58-49e2-9cdc-b2eb4273611d; code baseline none.
- Involved files: components/AnnexUpload/components/AppendixRequirementGrid.vue, company/companyRecordAgency/detail.vue, company/companyRecordAgency/components/AccountStateDialog.vue, styles/detail-form.scss, company/companyRecordAgency/index.vue, toB/companyRecord/detail.vue.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：4f2bea14-4e58-49e2-9cdc-b2eb4273611d


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "vue2_vfor_key",
  "source_extraction_id": "40b50386543f48a8aa414293683a2a75",
  "version": 1,
  "memory_type": "preferences"
}
-->
