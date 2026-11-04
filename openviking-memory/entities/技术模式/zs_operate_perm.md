# zs-operate 列需要布尔权限
列 `zs-operate-column` 使用 `permission` 作为布尔开关，并使用 `permissionType` 作为权限后缀。

## 问题
- 使用数组代替布尔值会导致 `permissionType` 变为未定义，并且权限验证失败。

## 修正
- 在 `institutionRegister/index.vue` 中，`buttons()` 定义 `permission: true` 和 `permissionType: 'query'` 以进行修正。

## 相关文件
- `components/zs-operate-column/zs-operate-column.vue`
- `components/OperationBtnGroup/index.vue`
- `store/modules/permission.js`
- `utils/permission.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_operate_perm",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "entities"
}
-->