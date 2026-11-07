# 一般表决线下投票弹框误显候选人选举修复
太仓G 一般表决详情页点击「线下投票录入」时，弹框误走了「候选人选举」两步流程，已修复为单页表单。

## 问题根因
- decisionCommon/VoteRangeDialog.vue 用路由名 `pageType == 'owner'` 判断是否走一般表决流程
- 一般表决详情页路由为 `generalDecision`，不满足该条件，误走候选人选举两步流程

## 修复方案
- 在 DecisionRangeTable 中向 VoteRangeDialog 传入已有的 `decisionPolicy` 属性
- 在 VoteRangeDialog 中用 `decisionPolicy === 'general'` 判断是否为一般表决

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 修复后一般表决线下投票弹框显示单页表单（决策项选择、表决意见、签字图片上传、直接「确定」提交），不再显示候选人选举步骤条
- 涉及文件：`decisionCommon/VoteRangeDialog.vue`、`decisionCommon/components/DecisionRangeTable.vue`、`ownerDecision/components/VoteRangeDialog.vue`
- 所属项目：太仓G；来源会话：e9e71106-e4a9-41fe-a2ee-72a4cf99c6d9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_vote_dialog_fix",
  "source_extraction_id": "ba1b615a3ae2479ebe88a812de01811c",
  "version": 1,
  "memory_type": "entities"
}
-->