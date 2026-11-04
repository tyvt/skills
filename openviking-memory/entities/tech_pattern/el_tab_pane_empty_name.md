# el-tab-pane empty name breaks orderStatus param
Setting el-tab-pane :name to empty string is illegal in Element UI and makes the bound orderStatus become index 0, breaking query params.

## Problem
- Clicking "All" sets v-model-bound queryParams.orderStatus to index 0 instead of a status value
- In getQueryParams, orderStatus || undefined treats '0' as truthy and passes the bad param through

## Solution
- Use constant ALL_ORDER_STATUS with value 'all' as the "All" option
- Initialize orderStatus to 'all'
- In getQueryParams, convert 'all' to undefined so it is filtered out

## Involved files
- zhi2-web-admin/src/components/zs-button/zs-button.vue
- zhi2-web-admin/src/views/property/workOrder/order/index.vue
- zhi2-web-admin/src/components/ListOperationButtonContainer/index.vue
- zhi2-web-admin/src/mixins/table.js
- zhi2-web-admin/src/views/cloudguardian/record/index.vue
- zhi2-web-admin/src/main.js
- zhi2-web-admin/src/views/benefit/pubRevenueContract/index.vue
- zhi2-web-admin/src/mixins/listMixins.js

## Source and verification
- Evidence: src=产品2.0/056.md
- Project: 产品2.0; session: 896a4167-b34c-4afa-9eed-b4e49624b8d5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "el_tab_pane_empty_name",
  "source_extraction_id": "e7c605a5c99a41d8ac71682f2e3b63a6",
  "version": 1,
  "memory_type": "entities"
}
-->