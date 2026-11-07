# OperationBtnGroup 提交后自动刷新修复
苏州市房地产监测V3 中 `OperationBtnGroup` 组件统一在提交/审核成功后触发刷新，解决提交审核后页面不自动刷新的问题。

## 统一事件
- `OperationBtnGroup/index.vue` 新增 `emitStateChange()`，提交、审核、取消提交/取消审核成功后触发 `refresh` + `update`
- `handleApproval()`、`handleSubmit()` 均调用 `emitStateChange()`，`handleSubmit` 额外 `$emit('after-submit')`
- `jgxm/detail.vue` 等 33 个只绑了 `@refresh="init"` 的页面提交后会自动刷新，无需逐页修改

## 清理重复绑定
- 为避免提交时 `getDetail` 被调用两次，已从 99 个 `operation-btn-group` 标签移除重复绑定

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`OperationBtnGroup/index.vue`、`supervision/agreement/jgxm/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：30be24cb-105f-4bdc-aa08-3b0e6ab11f36；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_btn_refresh",
  "source_extraction_id": "828ec5e928bc4e768c9341b93118b60e",
  "version": 1,
  "memory_type": "entities"
}
-->