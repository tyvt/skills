# 总体投票完成弹窗与昆山的对齐
弹窗“总体投票完成维护”与昆山统一版本的字段逻辑保持一致。

## 背景
- 总体投票完成维护弹窗的原始字段逻辑与昆山统一版本存在差异
- 非选举类型不应渲染候选人表格，且按钮应为“确认并推送APP”

## 解决方案
- 使用 ownerCalculationChart 字段计算比例，并添加兜底 `|| 0`
- 添加“参与权数占比”，调整赞成比例维度，并包含民法典提示
- 对于非选举类型不渲染候选人表格；按钮变为“确认并推送APP”

## 验证与归属
- 验证证据: extracted source=cursor session=b4e53b8e-164f-4672-9854-192edd804ed5
- 涉及文件: decisionCommon/components/MaintainResultDialog.vue, MaintainResultDialogLite.vue, config.js, ownerDecision/components/MaintainResultDialog.vue, VoteView.vue, generalDecision/detail.vue, 昆山/ownerDecision/components/MaintainResultDialog.vue, 昆山/optionDecision/components/MaintainResultDialog.vue
- 所属项目: 太仓G; 会话: b4e53b8e-164f-4672-9854-192edd804ed5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_dialog_kunshan",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->