# 一般表决详情新增决策范围弹窗错误修复
太仓G 一般表决详情页点击「新增」误用完整版 DecisionRangeTable 打开表单弹窗并调接口导致异常，已修复为对齐昆山打开「选择户室」弹窗。

## 问题根因
- 一般表决详情页使用 DecisionRangeTable（完整版），点击「新增」会打开「新增决策范围」表单弹窗并调接口，导致系统异常
- 昆山正确行为是打开「选择户室」弹窗（RangeHouseDialog），通过批量选择户室来新增决策范围

## 修复方案
- 在 decisionCommon/components/DecisionRangeTable.vue 中引入 RangeHouseDialog 和 batchAdd 接口
- 一般表决（decision-policy="general"）点击「新增」时打开「选择户室」弹窗
- 维修资金表决（maintain）仍走原来的「新增决策范围」表单
- 选择户室后调用 batchAdd 批量新增并刷新列表

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 备注：若左侧树仍显示「暂无数据」，多为小区 propertyProjectId 或后端树接口数据问题
- 涉及文件：decisionCommon/components/DecisionRangeTable.vue、generalDecision/detail.vue、decisionCommon/config.js
- 所属项目：太仓G；来源会话：0a72f656-dc31-41e6-9305-4a7371db4213；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "range_add_dialog",
  "source_extraction_id": "742ed8116127406da6d8f6fc1bd10278",
  "version": 1,
  "memory_type": "entities"
}
-->