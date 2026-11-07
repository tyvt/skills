# search_form_flex
搜索表单中的 flex 对齐冲突导致项目 苏州市房地产监测V3 中的字典对话框错位。
## 问题
- `zs-search-form` 单行 `justify="space-between"` 与 `form-content-col` 的 `flex:1` 冲突
- Headline 的 `align-items: flex-start` 与组件的 `align="middle"` 和 `button-col` 冲突
- 详情的 `el-row` 被错误地应用于 `single-line-row`，干扰了列的宽度
## 解决方案
- 在 `index.scss` 中，将 `.search-form-container > .el-row` 调整为 `justify-content: flex-start` 并统一对齐属性
## 文件
- DictDataDialog.vue, index.scss, zs-dialog.vue, detail-form.scss, detail.vue, variables.css, DictDataTable.vue
## 验证
- 来源: 苏州市房地产监测V3/052.md; 会话: f3c35b72-3629-4796-b668-c4d4ead84829

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f3c35b72-3629-4796-b668-c4d4ead84829


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_form_flex",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->
