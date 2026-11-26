---
audit_status: valid
last_checked: 2026-11-26T18:21:13+08:00
verdict_note: V3 OperationBtnGroup/index.vue实见effectivePermissionPrefix计算属性(-317)、permissionPrefix prop(-91)及-permission引用，属实。
---
- Vue 组件中 computed 属性不可与 prop 同名，否则触发 Vue warn，须重命名
- OperationBtnGroup 内 businessName 为 prop，新增 effectivePermissionPrefix 计算属性及 permissionPrefix 等 props，按钮 :permission 改用 effectivePermissionPrefix，接口提交仍传 businessName prop

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->