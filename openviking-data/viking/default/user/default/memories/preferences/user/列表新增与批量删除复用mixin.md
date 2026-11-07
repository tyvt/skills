- 新增按钮复用 mixin 的 `addButton`，通过 `extraPerms` 映射权限 `company:agencyBranch:edit`，`operationButtons` 仅在 B 端且有 `companyRecordId` 时加入。
- 批量删除复用 `multiDeleteButton` 与 `handleDelete`，选择列以 `:selectable="isSelectable"` 限制 `recordState === '0'` 可选，`deleteRequest` 批量并行调用接口。
- 重复的 `handleQuery`/`resetQuery` 删除并改用 mixin 默认实现，编辑按钮由 `showButton` 控制显隐。
- 验证证据：src=苏州市房地产监测V3/168.md

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "列表新增与批量删除复用mixin",
  "source_extraction_id": "17c3c914b57144389c4f647352fb2909",
  "version": 1,
  "memory_type": "preferences"
}
-->