# 待办任务批量审批弹窗样式修复
修复批量审批弹窗提示与表单并排挤压换行问题。

## 修改内容
- `flowable/components/BatchApprovalDialog.vue`：将 batch-tip 移入 form-box 内部，避免 flex 横向并排挤压换行
- 条数用 `<span class="batch-count">` 包裹，橙色 `#f6a240` 高亮
- `.batch-tip` 增加 `white-space: nowrap` 保证「批量处理 X 条数据」单行显示

## 验证与归属
- 涉及文件：BatchApprovalDialog.vue 等
- 所属项目：园区公共收益；来源会话：7bba50ec-878d-4ecc-aa51-2d784ce86b6d

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "approval_dialog_style",
  "source_extraction_id": "4e197fd9c17d47ec9857dc89e475924b",
  "version": 1,
  "memory_type": "entities"
}
-->