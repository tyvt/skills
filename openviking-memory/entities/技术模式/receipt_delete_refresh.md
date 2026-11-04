# 删除凭证不更新父页面并保留旧值
在 园区公共收益 (zhi2-web-admin) 项目中，`table.js` 的 `handleDelete` 仅更新子表且不通知父级；详情页在 «本次验证的值» 中保留旧值。

## 问题根因
- `table.js` 的 `handleDelete` 仅更新子表，未通知父级
- 详情页在 «本次验证的值» 中保留旧值

## 解决方案
- 在 `VerificationReceiptDetailTable.vue` 中添加 `deleteSuccessCallback`
- 调用 `this.$emit('refresh')` 以触发 `getDetail` 并重新加载详情

## 涉及文件
- `detail.vue` 和 `VerificationReceiptDetailTable.vue` (详情页和表格)
- `VerificationReceiptDetailDialog.vue` 和 `ReconciliationBusinessTable.vue`
- Mixins: `subTableMixins.js`, `table.js`, `detailMixins.js`

## 验证与归属
- 验证证据: extracted source=cursor session=dca7c647-3133-4108-a280-c82a7ee0abb4
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_delete_refresh",
  "source_extraction_id": "421380447a664b42a4a5d20500dc7f5e",
  "version": 1,
  "memory_type": "entities"
}
-->