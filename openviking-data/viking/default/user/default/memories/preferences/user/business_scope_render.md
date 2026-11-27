---
audit_status: valid
last_checked: 2026-11-27T04:14:03+08:00
verdict_note: businessScope/businessItemTable广泛命中(含多个zhi2-web-admin)，详情由DetailTemplate渲染的约定与代码一致。
---
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