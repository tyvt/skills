
# Unregistered Pagination Component Causes Vue Warning
Usage of unregistered `<pagination>` tag in pop-ups triggered `[Vue warn]: Unknown custom element` in Suzhou Real Estate Monitoring V3 (zhi2-web-admin).

## Description
- Project: Suzhou Real Estate Monitoring V3 (zhi2-web-admin)
- 5 dialog files replaced `<pagination>` with globally registered `<zs-pagination>`
- Pagination props and `@pagination` event binding kept unchanged

## Root Cause
- `<pagination>` was not registered globally, causing Vue warning in dialogs

## Fix
- Replaced `<pagination>` with `<zs-pagination>` in contractDialog.vue, projectDialog.vue, BuildingDialog.vue, presale/template/index.vue, contractMainInfo/index.vue, contractNoDialog.vue
- Same props and event bindings preserved

## Verification
- Evidence: src=苏州市房地产监测V3/131.md and src=苏州市房地产监测V3-rest/084.md
- Session: cf3b0379-9286-40e8-bc28-5a333098c2a0
- Files: contractDialog.vue, projectDialog.vue, BuildingDialog.vue, presale/template/index.vue, contractMainInfo/index.vue, contractNoDialog.vue, zs-pagination.vue, package.json

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：cf3b0379-9286-40e8-bc28-5a333098c2a0


<!-- MEMORY_FIELDS
{
  "category": "technical_standard",
  "name": "unregistered_pagination_component",
  "source_extraction_id": "cf49faa128334ff6ad44b159523193ea",
  "version": 3,
  "memory_type": "entities"
}
-->
