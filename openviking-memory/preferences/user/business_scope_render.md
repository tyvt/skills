- Detail-page business scope must stay rendered by DetailTemplate; do not replace it with `zs-textarea`, which breaks the two-column plain-text layout.
- `AgencyEntryNetworkSections.vue` should delete the `zs-textarea` block and let `basicInfo` return `items` containing the business scope.
- `agencyBasicInfoContent.js` should remove the `omitBusinessScopeDetailItems` function.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "business_scope_render",
  "source_extraction_id": "c897409ca5db4fc997b9baffac0093bb",
  "version": 1,
  "memory_type": "preferences"
}
-->