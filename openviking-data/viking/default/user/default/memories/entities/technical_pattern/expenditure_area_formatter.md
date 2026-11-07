
# Expenditure Contract Dialog Area Columns Lack Dictionary Formatter
pubExpenditureContract/detail.vue property-management-area select dialog binds street/community columns to code fields without converting to names.

## Problem
- In pubExpenditureContract/detail.vue property-management-area select dialog, street (街道) and community (社区) columns bind to subdistrict/community code fields.
- The codes are not converted to Chinese names.

## Fix
- Add formatter: this.subdistrictFormatter and this.communityFormatter to the columns.
- Reuse the area mixin dictionary loaded via detailMixins.

## Verification and Attribution
- Files: pubExpenditureContract/detail.vue, pubPaymentNotice/detail.vue, pubRegulatoryAccount/detail.vue, assetLeaseApply/detail.vue, area.js, detailMixins.js, zs-select-dialog-func.vue, zs-select-dialog.vue.
- Project: 园区公共收益; source session: fad5a385-6cf5-49cb-86a0-1abe38b27af6; code baseline: none.

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：fad5a385-6cf5-49cb-86a0-1abe38b27af6


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "expenditure_area_formatter",
  "source_extraction_id": "5ce0a0c981c640988963387d2655a557",
  "version": 1,
  "memory_type": "entities"
}
-->
