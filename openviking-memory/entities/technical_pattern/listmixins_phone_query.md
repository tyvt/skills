# ListMixins Phone Query Pattern
Huaian Property Management pattern where adding a phone query field to a list page is fully handled by listMixins without extra wiring.

## Implementation
- In `system/publicPage/index.vue` add `phone: undefined` to `queryParams` and insert a phone-number input into `formItems`.
- Search, export, reset, and cache automatically take effect via `listMixins` and `getQueryParams()`, requiring no additional code changes.

## Attribution
- Verified src=淮安物管/009.md; session 82c31af5-e691-4bcd-babb-0636c7bb1b31; baseline none.
- Files: system/publicPage/index.vue, system/user/index.vue, maintenance/components/userDialog.vue, mixins/listMixins.js, system/publicPage/detail.vue, mixins/table.js.

## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 来源会话：82c31af5-e691-4bcd-babb-0636c7bb1b31


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "listmixins_phone_query",
  "source_extraction_id": "8048139d28844282840824bac34c9a00",
  "version": 1,
  "memory_type": "entities"
}
-->
