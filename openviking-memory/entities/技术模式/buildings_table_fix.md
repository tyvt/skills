# BuildingsTable 删除按钮修复
`BuildingsTable.vue` 的删除按钮已修复，以验证选中的行。

## 原因
- 按钮的 `disabled` 仅检查了 `form.bizState != '0'`，忽略了行的选择

## 解决方案
- 改为 `:disabled="form.bizState != '0' || multiple"`
- `multiple` 保留在 `handleSelectionChange` 中，当未选择任何内容时为 `true`

## 涉及文件
- `src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildingsTable.vue`
- 相关文件: `zs-button.vue`, `PriceTable.vue`, `BuildRecordTable.vue`, `HouseScopeTable.vue`, `detail.vue`

## 验证与归属
- 验证证据: 提取自cursor session=a93d9024-80c0-483e-b0d2-40a3f424626b
- 基线: none; 所属项目: 产品 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildings_table_fix",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->