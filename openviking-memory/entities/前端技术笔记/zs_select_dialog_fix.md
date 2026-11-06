# 选择管理账户弹窗表格高度与压缩修复
修复园区公共收益项目「选择管理账户」弹窗（pubBankDetailDay 引用 `zs-select-dialog`）分页显示「共 8 条记录」但表格仅露 7 行、缩放仍不完整的问题。

## 问题原因
- `tableTrCount` 固定为 8 行，列内容较长出现横向滚动条占用 tbody 高度，第 8 行被挤掉且无纵向滚动条
- `.dialog-right` 表格用 `flex: 1; min-height: 0`，弹窗 flex 布局下被压缩，固定行高表格底部被裁切

## 修复内容
- `zs-select-dialog.vue` 与 `zs-select-dialog-func.vue` 中 `tableTrCount` 改为按当前页实际条数（或 pageSize）动态计算，并多预留 1 行缓冲横向滚动条
- 表格容器不再被 flex 压缩（`flex-shrink: 0`），内容过高时由 `.dialog-right` 滚动
- `getList` 完成后调用 `doLayout()` 重算布局

## 验证与归属
- 涉及文件：zs-select-dialog.vue、zs-select-dialog-func.vue、pubBankDetailDay/index.vue
- 所属项目：园区公共收益；来源会话：0369602c-e19b-47c4-b72b-a8e1c7d91b45

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_select_dialog_fix",
  "source_extraction_id": "a0a0a0c0aaa74832979fdcae5833192c",
  "version": 1,
  "memory_type": "entities"
}
-->