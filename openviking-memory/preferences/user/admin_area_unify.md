- In companyApplyAudit/index.vue, change list query param `approvalRegion` to `administrativeArea`; replace `region-cascader` filter with `select` using dict `ECONOMIC_INSTITUTIONS_REGION`; `init()` loads dict then requests list.
- In companyApply.js add field comments and new `updateCompanyApply` API; keep `formatRegion` with `approvalRegion` fallback for backend transition.
- Applied across institution record management pages for unified administrative area handling.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "admin_area_unify",
  "source_extraction_id": "6c363dc7a77448a1a17cc850c32df4b1",
  "version": 1,
  "memory_type": "preferences"
}
-->