# 分摊页区分概算与决算字段来源
泰兴小程序维修项目分摊页已区分「概算/决算」字段来源，通过跳转参数 scope 控制。

## 修改内容
- `apply-detail.vue` 的「我的分摊」跳转增加 `scope=estimated`
- `object-detail.vue` 的「我的分摊」跳转增加 `scope=final`
- `budget-apportion.vue` 根据 `scope` 选择字段：概算用 `shareAmountG`/`maintenanceAmountG`/`raiseAmountG`，决算用 `shareAmountJ`/`maintenanceAmountJ`/`raiseAmountJ`

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`src/pages_maintain_project/apply-detail.vue`、`src/pages_maintain_project/object-detail.vue`、`src/pages_maintain_project/budget-apportion.vue`
- 来源会话ID：41bbe8da-aee3-450c-a9c6-47cbe8ec62b7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "budget_apportion_scope",
  "source_extraction_id": "737837da48e84bd3b1294514eb020349",
  "version": 1,
  "memory_type": "entities"
}
-->