---
audit_status: valid
last_checked: 2026-11-27T18:21:08+08:00
verdict_note: 偏好类记忆，描述避免prop与computed同名冲突(effectivePermissionPrefix)，OperationBtnGroup可归属，无违规
---
- 避免在 OperationBtnGroup 中将 'businessName' 定义为 prop 同时作为计算属性，因为这会触发 Vue 的警告；使用新的计算属性 'effectivePermissionPrefix' 提供给按钮 :permission 以避免冲突。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->