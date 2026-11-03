# 嵌套确认弹框独立visible致父关后残留
VoteRangeDialog.vue 中嵌套「线下票录入信息确认」弹框由独立 tipDialogVisible 控制，且 zs-dialog 挂载 body，父框 close() 后确认框残留。

## 问题根因
- 嵌套确认弹框由独立 `tipDialogVisible` 控制
- `zs-dialog` 挂载 `body`，父框 `close()` 后确认框残留

## 修复方案
- `finalSubmit` 成功先设 `tipDialogVisible = false` 再关主框
- `close()` 统一重置该状态

## 验证与归属
- 验证证据：光标会话 161a2f78-6494-4326-934c-d2a31ef3bbc2 提取
- 涉及文件：ownerDecision/components/VoteRangeDialog.vue、ownerDecision/components/DecisionRangeTable.vue、optionDecision/components/VoteRangeDialog.vue
- 所属项目：太仓G；来源会话：161a2f78-6494-4326-934c-d2a31ef3bbc2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "nested_dialog_residue",
  "source_extraction_id": "975f8cf81e1849d283acc90cad1435ef",
  "version": 1,
  "memory_type": "entities"
}
-->