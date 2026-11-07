# Amount Input Integer Constraint
Number inputs in zhi2-web-admin views were switched from el-input/zs-input with v-money:0 to amount-input with :dot="0" to enforce integer entry.

## Change Detail
- Replaced el-input/zs-input + v-money:0 with amount-input :dot="0" in affected views
- Kept disabled and placeholder behaviors intact during the migration

## Affected Files
- zhi2-web-admin/src/views/property/partyOrganization/detail.vue
- zhi2-web-admin/src/views/autonomy/multiply/components/MaintainResultDialog.vue
- zhi2-web-admin/src/views/benefit/pubElevMaintenanceIncome/detail.vue
- zhi2-web-admin/src/components/AmountInput/index.vue

## Verification
- Source cursor session: d7c7c5d4-1f13-462a-8aeb-c77645611399
- Code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：d7c7c5d4-1f13-462a-8aeb-c77645611399


<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "amount_input_integer",
  "source_extraction_id": "e430f49a552a4095b922c92baa03f3e4",
  "version": 1,
  "memory_type": "entities"
}
-->
