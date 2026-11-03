# House Sale Status Normalization
In Suzhou Real Estate Monitoring V3 house-limit module, resolveHouseSaleStatus in houseLimitConstants.js unifies the saleStatus source so dict-tag display and isHouseSelectable disable logic stay consistent.

## Change Points
- houseLimitConstants.js adds resolveHouseSaleStatus with logic saleStatus ?? sale_status
- isHouseSold and normalizeHouseLimitLineRow both call resolveHouseSaleStatus
- HouseSelectDialog.normalizeHouse writes the normalized saleStatus

## Verification and Attribution
- Verification: src=苏州市房地产监测V3-rest/149.md
- Files: HouseSelectDialog.vue, houseLimitConstants.js, detail.vue, limitFormMixin.js, limitAdd.vue, HouseLimitFloorSelectGrid.vue, limitCancel.vue
- Source session: f742546b-5fa1-4c38-be7c-f50d9d083f69; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "sale_status_normalize",
  "source_extraction_id": "594543d5a8634a28bf523bd297fd670c",
  "version": 1,
  "memory_type": "entities"
}
-->