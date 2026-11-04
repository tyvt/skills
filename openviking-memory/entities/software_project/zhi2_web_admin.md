# zhi2-web-admin
Vue.js web administration frontend for the "产品2.0" real-estate management system.

## Description
- Located at d:/repository/产品2.0/zhi2-web-admin
- Vue.js SPA admin panel covering complexes, property contracts, bills, registration, and certificates

## Key Facts
- `zs-search-form` is globally registered through main.js
- `detailMixins` (from form.js) already declares `loading` in data, so components must not declare a same-named `loading` prop
- `goFiling` in propertyContractTable.vue must pass `complexId` via route query so the filing detail page can backfill via `setProject`
- `property/bill` list returns `complexName` only; the payment flow validates bill `id` and fetches `complexId` through `payDetail`

## Relations
- Belongs to the "产品2.0" product line


<!-- MEMORY_FIELDS
{
  "category": "software_project",
  "name": "zhi2_web_admin",
  "source_extraction_id": "5a097ed472984afcbfab163f215a0e4a",
  "version": 1,
  "memory_type": "entities"
}
-->