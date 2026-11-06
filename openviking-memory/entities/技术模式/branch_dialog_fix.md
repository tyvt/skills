# 园区公共收益 监管分支弹窗关闭报错修复
园区公共收益项目 pubRegulatoryBranchDialog.vue 在查看模式关闭弹窗时因 $refs.form 为 undefined 触发 Vue 警告。

## 问题原因
- onClose 中直接调用 `this.$refs['form'].resetFields()`
- 查看模式（`dialogFormMode == 'view'`）下模板渲染 `DetailTemplate`，无 `ref="form"` 的 `zs-form`
- 关闭弹窗时 `this.$refs.form` 为 undefined，触发 `Cannot read properties of undefined`

## 涉及文件
- zhi2-web-admin/src/views/system/workBank/components/pubRegulatoryBranchDialog.vue
- zhi2-web-admin/src/views/benefit/pubWorkBank/components/pubRegulatoryBranchDialog.vue

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：28cb2742-1629-48a6-ba09-eb8164b389aa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_dialog_fix",
  "source_extraction_id": "d0846b77e3174058abe8f842a0c0bb59",
  "version": 1,
  "memory_type": "entities"
}
-->