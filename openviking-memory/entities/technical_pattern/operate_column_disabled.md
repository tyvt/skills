# zs-operate-column Disabled Still Triggers Delete
zs-operate-column.vue disabled state still fires @click.native, and houseTable.vue handleDelete lacked canOperate check, causing deletes on disabled rows.

## Problem
- zs-operate-column.vue: when disabled, @click.native still triggered the delete handler.
- houseTable.vue handleDelete did not check canOperate before deleting.
- bizState defaulted to 0, misjudged as pending submission (待提交).

## Fix
- Component added isButtonDisabled/onButtonClick so disabled buttons do not execute delete.
- houseTable.vue removed visible grey-out display.
- handleDelete starts with a canOperate check.
- bizState default value changed to undefined.

## Verification and Attribution
- Files: src/views/benefit/assetsLeaseContractFiling/detail.vue, src/views/benefit/assetLeaseApply/components/houseTable.vue, src/mixins/subTableMixins.js, src/components/zs-operate-column/zs-operate-column.vue, src/mixins/table.js, src/views/benefit/assetLeaseApply/components/subAdvertiseTable.vue, src/mixins/leaseContractMixins.js, src/mixins/detailMixins.js.
- Project: 园区公共收益; source session: 4901c51b-48fd-4552-a991-5fc17b4c1409; code baseline: none.

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：4901c51b-48fd-4552-a991-5fc17b4c1409


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "operate_column_disabled",
  "source_extraction_id": "9101bab5bff9401d855c4c5db50c3276",
  "version": 1,
  "memory_type": "entities"
}
-->
