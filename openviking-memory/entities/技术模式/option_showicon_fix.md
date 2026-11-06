# 选项表决详情导出与线下投票按钮缺失修复
太仓G 选项表决详情页「投票信息」标签页下「导出」与「线下投票录入」按钮因 show-icon 条件错误被隐藏，已修复为双标签页均显示。

## 问题根因
- 在 optionDecision/detail.vue 中，DecisionRangeTable 的 show-icon 被写成 mainCardValue == 0
- 切换到「投票信息」标签页时 mainCardValue 为 1，整行操作区被 v-if="showIcon" 隐藏
- 导致「导出」和「线下投票录入」虽 show-vote 为 true 也不显示

## 修复方案
- 将 show-icon 改为在「基本信息」和「投票信息」两个标签页都显示操作区
- 修改代码：:show-icon="mainCardValue == 0 || mainCardValue == 1"

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证：刷新后在「投票信息」→「决策明细」中应能看到「导出」和「线下投票录入」按钮
- 涉及文件：optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue
- 所属项目：太仓G；来源会话：35795d81-ec7d-4058-baa4-9e944062ac4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_showicon_fix",
  "source_extraction_id": "742ed8116127406da6d8f6fc1bd10278",
  "version": 1,
  "memory_type": "entities"
}
-->