# Appendix Bus Code Pairing
Attachment queries in `DeveloperBasicInfoDetail.vue` pair a busId with a busCode; a mismatched pair returns no attachment.

## Rule
- 备案维度 (record): busCode `040100` (备案码) paired with recordId.
- 变更维度 (change): busCode `qybgxq` (变更码, ZenTao 5445 paired codes) paired with changeId.
- `displayAppendixBusId` switches to changeId via `resolveLicenseAppendixBusId` under admin review (`bizState='1'` or `activeChangeDisplayStatus='2'`); `displayAppendixBusCode` must also switch to `DEVELOPER_CHANGE_APPENDIX_BUS_CODE` (`qybgxq`) or the query fails.
- Fix pattern: computed reusing `isCompanyRecordChangeUnderAdminReview` returns `qybgxq` at change dimension, original备案码 otherwise.

## Significance
- Bug 6363: busCode stayed `040100` while busId went to changeId → review-stage appendix area blank; display/change-save/change-filing kept recordId+`040100` so were unaffected.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bus_code_pairing",
  "source_extraction_id": "6436507d787f4d47b5a00e21a664f7b7",
  "version": 1,
  "memory_type": "entities"
}
-->