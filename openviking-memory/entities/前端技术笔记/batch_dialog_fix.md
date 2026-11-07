# 待办任务批量审批弹窗样式修复
修复园区公共收益项目待办任务批量审批弹窗的样式挤压与换行问题。

## 问题原因
- 批量审批弹窗中 `batch-tip` 与表单在 `zs-dialog` 横向 flex 布局中并排挤压导致换行

## 修改内容
- `flowable/components/BatchApprovalDialog.vue`：将 `batch-tip` 移入 `form-box` 内部避免挤压换行
- 条数用 `<span class="batch-count">` 包裹并设置橙色 `#f6a240` 高亮
- 为 `.batch-tip` 增加 `white-space: nowrap`，确保「批量处理 X 条数据」始终单行显示

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：待办任务页勾选数据后点「批量处理」，弹窗顶部提示文案正常单行展示
- 涉及文件：BatchApprovalDialog.vue、AuditDialog/index.vue、zs-approval/ApprovalProcessDialog.vue
- 所属项目：园区公共收益；来源会话：7bba50ec-878d-4ecc-aa51-2d784ce86b6d

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "batch_dialog_fix",
  "source_extraction_id": "4362f32ddadb43a382566e25423341a1",
  "version": 1,
  "memory_type": "entities"
}
-->