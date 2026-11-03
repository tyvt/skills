- Prefers detail-page form labels left-aligned: change-filing detail pages (toB/companyRecord/detail.vue, toB/agencyRecord/detail.vue, etc.) use label-position="left" instead of right.
- zs-form.vue in detail-from-container scenario: passes through label-position="left" and keeps labelWidth only when explicitly given; otherwise forces top.
- detail-form.scss restricts label-on-top style to .el-form--label-top; index.scss standardizes label-left left alignment.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "detail_form_label_position",
  "source_extraction_id": "90cef1a211a94d8cae6604bafd443cb9",
  "version": 1,
  "memory_type": "preferences"
}
-->