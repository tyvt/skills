
# 标签管理弹窗操作列表头右对齐修复（苏住房G）
苏住房G 项目公共查询标签管理（publicQuery/complex）修复操作列表头未与下方按钮右对齐的问题。

## 问题原因
- 操作列按钮已通过 `justify-content: flex-end` 右对齐，但表头「操作」仍使用默认左对齐

## 修复内容
- 在 `TagManageDialog.vue` 中补充表头右对齐样式：`:deep(th.zs-operate-column-cell .cell) { text-align: right; }`
- 刷新页面后，「操作」表头应与下方「编辑」「删除」按钮右对齐

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/components/TagManageDialog.vue
- zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：918213cd-0110-443d-8bd5-d53a2af3069d；验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tag_align_fix",
  "source_extraction_id": "759fdfdefd9e43239155ff8624012ede",
  "version": 1,
  "memory_type": "entities"
}
-->