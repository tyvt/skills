# 新合同对话框中错误的 Flex 导致空白
在苏州市房地产监测V3项目中，向 `.dialog-left` 添加 `flex: 1` 会在宽度为80%的对话框中产生空白。

## 问题根因
- `.dialog-left` 使用 `flex: 1` 会被拉伸至约80%宽度对话框的一半，从而产生空白

## 解决方案
- 将 `.dialog-left` 改为固定侧边栏 `flex: 0 0 290px` 和 `max-width: 290px`
- 保持右侧使用 `flex: 1` 以填充剩余空间

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/199.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: chooseHouseDialog.vue (contractMainInfo), zs-select-dialog.vue, ElevatorOpeningDialog.vue, zs-dialog.vue, chooseHouseDialog.vue (contractView), contractMainInfo/index.vue, vite.config.js
- 会话: f882f9ab-4b6d-42b0-8cfa-ee45d52f7c6b; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "contract_dialog_left_flex",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 1,
  "memory_type": "entities"
}
-->