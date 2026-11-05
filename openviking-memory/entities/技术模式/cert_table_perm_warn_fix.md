# certificatesTable.vue 权限警告修复
certificatesTable.vue 中 operationButtons 的 attrs 携带 permission: false 传给 ZsButton 触发 Vue 类型校验警告，已修复。

## 问题根因
- certificatesTable.vue 的 operationButtons 在 attrs 里写 `permission: false`，通过 `v-bind="button.attrs"` 传给 ZsButton
- ZsButton 的 permission 类型为 Array，布尔值触发 Vue 类型校验警告

## 修复内容
- 从「新增」「删除」按钮的 attrs 中移除 `permission: false`
- 不传 permission 时 checkPermission 视为无权限限制并显示按钮，与原先 false 意图一致
- buttons 配置里保留的 `permission: false` 是给 zs-operate-column 用的，该组件用 `if (!button.permission) return true` 处理，无需改动

## 验证与归属
- 验证：刷新从业人员详情页证书区域后控制台无警告
- 涉及文件：certificatesTable.vue、zs-button.vue
- 所属项目：产品2.0；来源会话：238293ef-3bd5-4396-98d5-3034f011a25c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_table_perm_warn_fix",
  "source_extraction_id": "3ea283b432954418bfe9e179e58be66d",
  "version": 1,
  "memory_type": "entities"
}
-->