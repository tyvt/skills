# Contract 2016 component judges pre-sale by /cash and reuses shared component
In Suzhou Real Estate Monitoring V3, `contract/index.vue` was changed to judge pre-sale by route `/cash` and extracted a shared operation component for both branches.

## Root Cause
- `contract/index.vue` `contractType` was hardcoded to pre-sale, causing `reSign` pre-sale to wrongly jump to `/pre`

## Fix
- `contractType` now judges pre-sale by route `/cash`
- Added `components/ContractOperationActions.vue` shared by both branches
- Chapter fields renamed per spec (e.g. `sellerName→seller`, `decorationType→decorateType`)

## Verification
- Evidence: src=苏州市房地产监测V3-rest/021.md
- Files: contract/index.vue, contract/chapters/pre/chapter1.vue, contract/utils/contractRequest.js, contract/chapters/suzhou2016/chapter1.vue, contract/chapters/suzhou2016/components/SzPartyBlock.vue, contract/chapters/suzhou2016/data.js, docs/commercial-contract-migration-api.md, contract/chapters/suzhou2016/mixins/szForm.js
- Project: 苏州市房地产监测V3; Source session: 52faca44-46f3-48c0-9ba2-d452448948d2; Code base: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "contract_cash_reuse",
  "source_extraction_id": "0b7b022a5898402b92372b2cf88fe87d",
  "version": 1,
  "memory_type": "entities"
}
-->