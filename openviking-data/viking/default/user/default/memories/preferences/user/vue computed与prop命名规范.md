- Vue 组件中 computed 属性不可与 prop 同名，否则触发 Vue warn，须重命名
- OperationBtnGroup 内 businessName 为 prop，新增 effectivePermissionPrefix 计算属性及 permissionPrefix 等 props，按钮 :permission 改用 effectivePermissionPrefix，接口提交仍传 businessName prop

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue computed与prop命名规范",
  "source_extraction_id": "9e54f66bae9c41bab41d42c2c7413b3d",
  "version": 1,
  "memory_type": "preferences"
}
-->