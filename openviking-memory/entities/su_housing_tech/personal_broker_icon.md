# detail.vue personal property wrongly shows broker icon
In the 苏住房C mobile end `pages_transaction/stockHouse/detail.vue`, personal properties (publishRole==0) did not hide the company/broker icon block.

## Root Cause
- Personal properties (publishRole==0) in `pages_transaction/stockHouse/detail.vue` did not hide the company/broker icon block

## Solution
- Only render the block when publishRole==1 and agentCompanyName exists
- Change the label text to "个人房源" (personal property)

## Verification and Attribution
- Evidence: src=cursor session=cdb00ca8-ca47-462a-8aa6-e2db4d35b371
- Files: pages_transaction/stockHouse/detail.vue, pages_main/houseMap/components/StockHouse.vue, pages_transaction/stockHouse/index.vue, api/transaction.js, pages_transaction/publishHouse/type.vue
- Project: 苏住房C (zhi2-mobile-shimin); source session: cdb00ca8-ca47-462a-8aa6-e2db4d35b371; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "personal_broker_icon",
  "source_extraction_id": "f6f7117455e04147ae37599394ce9255",
  "version": 1,
  "memory_type": "entities"
}
-->