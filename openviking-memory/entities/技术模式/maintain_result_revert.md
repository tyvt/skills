# 维修资金结论维护页还原客户环境
太仓G 维修资金表决在重构后改用了 decisionCommon/MaintainResultDialog.vue 并按昆山版统一，与客户环境不一致，已通过 isMaintainFund 判断还原。

## 问题根因
- 维修资金表决重构时改用 decisionCommon/MaintainResultDialog.vue，该组件按昆山版统一，与客户环境（图1）存在四项差异
- 差异包括：多出「参与权数占比」字段、接口由 calculationChart 改为 ownerCalculationChart、下方表格在维修资金场景被隐藏、按钮文案改为「确认并推送APP」

## 修复方案
- 在 decisionCommon/MaintainResultDialog.vue 增加 isMaintainFund 判断（路由为 maintain 时生效）
- 恢复户数/面积四个占比字段，去掉权数相关字段和提示图标
- 恢复调用 calculationChart 接口计算占比
- 恢复始终显示下方候选人表格区域，按钮文案改回「确认」

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/MaintainResultDialog.vue、maintainDecision/detail.vue
- 所属项目：太仓G；来源会话：f57cbb90-c8af-4874-9961-54eca50f5cb8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintain_result_revert",
  "source_extraction_id": "8b0f5f72e9164350b1b5bfb2da20cbfe",
  "version": 1,
  "memory_type": "entities"
}
-->