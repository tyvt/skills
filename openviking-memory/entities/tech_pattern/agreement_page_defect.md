# Fund Supervision Agreement Page API Defect
Known state of the fund supervision agreement detail main page, its API comments, and the same defect across bankC* variant pages in Huaian existing-housing zhi2-web-admin.

## Page and API Location
- Fund supervision agreement detail main page is `src/views/v1/presale/stock/agreement/detail.vue`
- API comments live in `src/api/agreement/agreement.js`, explicitly labeled "查询/修改资金监管协议" (query/modify fund supervision agreement)
- Similar `bankC*` variant pages share the same defect and need unified handling

## Involved Files
- `src/views/v1/presale/stock/agreement/detail.vue` (main page)
- `src/api/agreement/agreement.js` (API comments)
- `src/views/v1/presale/stock/bankConfirm/detail.vue`, `comprehensiveQuery/detail.vue`, `agreement/index.vue`
- `src/views/v1/presale/stock/agreement/components/AgreementPrint.vue`, `SellerTable.vue`
- `src/views/v1/presale/stock/agreementChange/detail.vue`

## Verification and Attribution
- Verification: extracted source=cursor session=d95a1342-ee75-4624-826f-714037b1fe02
- Project: Huaian existing-housing (淮安存量房); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "agreement_page_defect",
  "source_extraction_id": "d557e83b55bd4a5dad958b42732f8282",
  "version": 1,
  "memory_type": "entities"
}
-->