# 维修基金投票中错误使用了统一弹窗
维修基金投票的重构使用了昆山统一弹窗，与客户环境不一致。

## 问题根因
- 重构使用了昆山统一版本中的 decisionCommon/MaintainResultDialog.vue
- 这导致了与客户环境不一致

## 修正
- 添加 isMaintainFund 校验（maintain 路由）
- 恢复 calculationChart 界面、房屋/面积四个字段、候选人表格始终可见以及"确认"按钮

## 验证与归属
- 验证证据: extracted source=cursor session=f57cbb90-c8af-4874-9961-54eca50f5cb8
- 涉及文件: maintainDecision/detail.vue, decisionCommon/components/MaintainResultDialog.vue, ownerDecision/components/MaintainResultDialog.vue, decisionCommon/components/MaintainResultTable.vue, ownerDecision/components/MaintainResultTable.vue, decisionCommon/config.js
- 所属项目: 太仓G; session: f57cbb90-c8af-4874-9961-54eca50f5cb8; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术 Bug",
  "name": "maintain_fund_dialog",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->