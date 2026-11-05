# 账户拆分选择账户弹窗样式统一
产品2.0 账户拆分模块「选择账户」弹窗改为复用 `zs-select-dialog`，与「选择物业管理区域」弹窗样式交互一致。

## 修改说明
- `accountNameDialog.vue` 原自定义 `zs-dialog` + `zs-table`（旧样式 `table-size="mini"`、`:border="true"`）改为内部复用 `zs-select-dialog`。
- 统一样式：表格行高、无边框样式、搜索表单布局、分页样式。
- 单选/多选通过复选框 +「确定」按钮操作，与物业管理区域弹窗一致。

## 业务逻辑
- 新增拆分：按 `propertyProjectId` 查询账户。
- 拆分目标户：按 `accountSplitId` 查询可用账户（`son` 模式）。
- 业务逻辑保持不变。

## 涉及文件与来源
- 文件：`zhi2-web-admin/src/views/maintenance/accountSplit/components/accountNameDialog.vue`、`detail.vue` 等（前缀 `d:/repository/产品2.0`）。
- 所属项目：产品2.0；来源会话：c7c58078-a865-450f-bba0-bff68effa3c3。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_select_dialog",
  "source_extraction_id": "d862fbde073b4aeb99df7780c2490c15",
  "version": 1,
  "memory_type": "entities"
}
-->