# 表决详情主Tab切换handleChange误改cardValue
太仓G端业委会选举等详情页在基本信息主Tab走handleChange时误设子Tab的cardValue致文案与表格不一致。

## 问题根因
- 基本信息主Tab的handleChange无条件将子Tab cardValue设为1，渲染「候选业主」表格但子Tab标签可能仍叫「决策范围」
- 表现为决策范围变成候选业主、候选人分组错乱

## 修复约定
- handleChange对cardValue联动仅保留维修资金表决(isMaintainVote)
- 业委会选举子Tab恢复「决策范围+候选业主配置」双Tab，与监委会选举对齐
- 改ownerDecision/optionDecision下VoteRangeDialog与DecisionRangeTable先确认业务类型再挂联动

## 验证与归属
- 验证：会话5f609ab0用户反馈业委会表决选候选人非分组、决策范围显示成候选业主
- 涉及文件：ownerDecision/components/VoteRangeDialog.vue、optionDecision/components/VoteRangeDialog.vue、decisionCommon/components/VoteRangeDialog.vue、ownerDecision/components/DecisionRangeTable.vue
- 所属项目：太仓G；来源会话：5f609ab0-21bb-4caa-86c9-16523f5a7854；代码基线：2ded8f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "handlechange_cardvalue",
  "source_extraction_id": "e6df2aa1bd8d4f0c96d35ad0e13bd80a",
  "version": 1,
  "memory_type": "entities"
}
-->