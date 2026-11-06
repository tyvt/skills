# OperationBtnGroup businessName 冲突修复
苏州市房地产监测V3 修复 `OperationBtnGroup` 中 `businessName` 同时定义为 prop 和 computed 导致的 Vue 警告。

## 问题原因
- `OperationBtnGroup` 里 `businessName` 是 prop（给接口路径用，如 `regProject`）
- 若在 `computed` 里定义同名 `businessName`，Vue 报错：The computed property "businessName" is already defined as a prop

## 修改内容
- 新增可选 props：`permissionPrefix`（完整权限前缀）、`permissionModuleName`/`permissionBusinessName`（分段覆盖）
- 新增计算属性 `effectivePermissionPrefix`（不叫 `businessName`）用于权限
- 按钮 `:permission` 改用 `effectivePermissionPrefix`
- 提交/审批仍传 `businessName`

## 涉及文件与归属
- 涉及：`OperationBtnGroup/index.vue`、`supervision/agreement/jgxm/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：6bc3a4e9-2565-4bd0-9acd-c67575e5b1aa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "按钮组businessName冲突修复",
  "source_extraction_id": "fcd6806d2909436b9c03c10e7af28512",
  "version": 1,
  "memory_type": "entities"
}
-->