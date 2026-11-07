- 在业务页面中，添加按钮移除自定义实现并复用 mixin 中的 `addButton`，通过 `extraPerms` 映射权限（例如：`company:agencyBranch:edit`）。
- 批量删除复用 mixin 的 `multiDeleteButton`；选择列 `selectable='isSelectable'` 将 `recordState==='0'` 限制为可选；`deleteRequest` 并行调用单 ID 接口；行内删除和批量删除共享 `handleDelete`。
- 重复的 `handleQuery`/`resetQuery` 被移除，使用 mixin 的默认实现；`showButton` 控制编辑按钮的可见性。
- 验证: src=苏州市房地产监测V3-rest/124.md; 涉及文件: AgencyBranchList.vue, order/index.vue, chargeItem/index.vue, listMixins.js, table.js, permsMixins.js, AgencyBranchDetail.vue, agencyBranch.js; 会话 b02c7339-410a-4155-9af2-1dd4826ef29d

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b02c7339-410a-4155-9af2-1dd4826ef29d


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 添加/删除按钮的 mixin 复用",
  "source_extraction_id": "dde3fbc9f6c8407fb1b50b1438772b93",
  "version": 1,
  "memory_type": "preferences"
}
-->
