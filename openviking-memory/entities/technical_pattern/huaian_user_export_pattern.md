# Huaian User Export Pattern
Huaian Property Management export fixes for system/user lists covering consistent params passing, shared precheck/download params, loading guard, and backend permission alignment.

## Root Cause and Fix
- Export API `system/user/export` did not uniformly pass `params`, so only the first page was exported; `system/publicPage/index.vue` was switched to call `system/user/publicExport` with an `exportLoading` flag reset in `finally()`.
- In `system/user/index.vue` the export precheck and the actual download must share `getQueryParams()` to keep filter conditions consistent, with the precheck setting `exportLoading` to block duplicate clicks.

## Cleanup and Alignment
- The `page` precheck and `publicExport` data-permission semantics must align with the backend.
- Remove leftover issues such as not using `getToken` and using a `v-for` index as key.

## Attribution
- Verified src=淮安物管/007.md (session 1f213572-ce02-4c37-b44f-d1f8f9f8b64c) and src=淮安物管/008.md (session bd0165fe-77d2-4973-ae1f-2a40fac12ebc); baseline none.
- Files: system/publicPage/index.vue, system/user/index.vue, system/role/index.vue, system/publicPage/detail.vue, property/eventReport/index.vue, publicQuery/complex/index.vue, building/building/index.vue, api/index.js, mixins/listMixins.js, mixins/table.js, mixins/permsMixins.js, components/zs-button/zs-button.vue, package.json.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "huaian_user_export_pattern",
  "source_extraction_id": "8048139d28844282840824bac34c9a00",
  "version": 1,
  "memory_type": "entities"
}
-->