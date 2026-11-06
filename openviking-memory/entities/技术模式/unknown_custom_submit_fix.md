# Unknown custom element Submit 修复
苏州市房地产监测V3 修复了 `Unknown custom element: <Submit>` 警告，调整了合同变更与合同详情页的提交按钮。

## 变更说明（contractChange/detail.vue）
- 删除无效的 `<Submit @init="init" />`，提交由 `operation-btn-group` 内置 `ZsSubmit` 承担
- `perms-prefix` 改为 `permission-prefix="contractChange:contractChange"`
- 增加 `:biz-state="form.bizState"`，并设置 `:show-edit="false"`、`:show-approval="false"`、`:show-print="false"`
- 增加 `:custom-print="true"`（与 `loanContract/detail.vue` 一致），避免 `bizState == 2` 时仍出现内置打印按钮

## 变更说明（stock/contract/detail.vue）
- 类似调整 `<Submit>` 相关组件，移除无效自定义元素

## 涉及文件
- `zhi2-web-admin/src/views/stock/contractChange/detail.vue`
- `zhi2-web-admin/src/views/stock/contract/detail.vue`
- `zhi2-web-admin/src/views/stock/loanContract/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：0cd339ed-3951-4a92-a34d-a231b8f72c6e；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unknown_custom_submit_fix",
  "source_extraction_id": "70ada2145f094d8f8e1450f3ecb4f669",
  "version": 1,
  "memory_type": "entities"
}
-->