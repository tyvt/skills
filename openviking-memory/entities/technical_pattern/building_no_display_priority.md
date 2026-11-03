# Building number display prioritizes buildingNo with buildingCode fallback
In Suzhou Real Estate Monitoring V3, building number display logic uniformly prefers `buildingNo`, falling back to `buildingCode` when empty.

## Scope
- Presale and cashsale module components adopt this rule
- `permitConstants.js` / `cashsaleConstants.js` `flatten*Houses` mappings sync `buildingNo`

## Affected Files
- Presale permit components: PresaleSelectBuildingDialog.vue, PresaleBuildingTable.vue, PresaleHouseTable.vue, detail.vue, PresaleProgressDialog.vue
- Cashsale components: CashsaleSelectBuildingDialog.vue, CashsaleDetail.vue
- Constants files: permitConstants.js, cashsaleConstants.js
- Entrust sale component: SelectBuildingDialog.vue

## Verification and Attribution
- Evidence: src=苏州市房地产监测V3/122.md
- Project: 苏州市房地产监测V3; Session: 762f7645-68ac-43ea-9ab7-f47dca205482; Baseline: none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "building_no_display_priority",
  "source_extraction_id": "21bae0b2f9ec4f2ebc5dd6faf236e3e2",
  "version": 1,
  "memory_type": "entities"
}
-->