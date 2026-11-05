# BuildingsTable 删除按钮禁用条件修复
产品2.0 的 zhi2-web-admin 中修复楼栋子表删除按钮在未选中行时仍可点击的问题。

## 问题根因
- `BuildingsTable.vue` 中删除按钮 `disabled` 只判断 `form.bizState != '0'`，未判断是否有选中行
- 虽传了 `:multi="multiple"`，但 `zs-button` 不会根据该属性禁用按钮

## 修复内容
- 删除按钮禁用条件改为 `:disabled="form.bizState != '0' || multiple"`
- `multiple` 在 `handleSelectionChange` 中维护：未选中任何行时为 `true`，选中后变为 `false`
- 写法与项目其他子表（如 `HouseScopeTable.vue`）一致

## 预期效果
- 刷新页面后，未勾选数据时删除按钮呈灰色不可点击

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildingsTable.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/HouseScopeTable.vue

## 验证与归属
- 所属项目：产品2.0；来源会话：a93d9024-80c0-483e-b0d2-40a3f424626b；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildings_delete_fix",
  "source_extraction_id": "8a43c32a273941439109c1eae5f6e5e3",
  "version": 1,
  "memory_type": "entities"
}
-->