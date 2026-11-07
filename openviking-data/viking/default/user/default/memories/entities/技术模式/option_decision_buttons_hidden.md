# 选项表决详情线下投票和导出按钮不显示
太仓G 选项表决详情页「投票信息」标签页下「导出」和「线下投票录入」按钮不显示，已修复显示逻辑。

## 问题根因
- 在 optionDecision/detail.vue 中，DecisionRangeTable 的 show-icon 被写为 mainCardValue == 0
- 切换到「投票信息」标签页时 mainCardValue 为 1，整行操作区被 v-if="showIcon" 隐藏
- 导致「导出」和「线下投票录入」虽然 show-vote 为 true，也不会显示

## 修复方案
- 将 show-icon 改为在「基本信息」和「投票信息」两个标签页都显示操作区
- 修改 detail.vue 第 263 行为 :show-icon="mainCardValue == 0 || mainCardValue == 1"

## 验证与归属
- 验证：刷新页面后，在「投票信息」→「决策明细」中应能看到「导出」和「线下投票录入」按钮
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue
- 所属项目：太仓G；来源会话：35795d81-ec7d-4058-baa4-9e944062ac4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_decision_buttons_hidden",
  "source_extraction_id": "5433d87848914d5697afe1274c0c6e32",
  "version": 1,
  "memory_type": "entities"
}
-->