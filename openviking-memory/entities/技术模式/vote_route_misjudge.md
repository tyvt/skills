# 路由名误判致一般表决弹框显候选人选举
VoteRangeDialog.vue 用路由名 pageType == 'owner' 判断一般表决，而一般表决路由为 generalDecision 不满足，误走候选人选举流程。

## 问题根因
- `VoteRangeDialog.vue` 使用路由名 `pageType == 'owner'` 判断一般表决
- 一般表决路由为 `generalDecision`，条件不满足，误走候选人选举流程

## 修复方案
- `DecisionRangeTable` 向 `VoteRangeDialog` 传 `decisionPolicy`
- 以 `decisionPolicy === 'general'` 判定，显示单页表单

## 验证与归属
- 验证证据：光标会话 e9e71106-e4a9-41fe-a2ee-72a4cf99c6d9 提取
- 涉及文件：decisionCommon/components/DecisionRangeTable.vue、ownerDecision/components/VoteRangeDialog.vue、optionDecision/components/VoteRangeDialog.vue、ownerDecision/detail.vue、decisionCommon/components/VoteRangeDialog.vue、ownerDecision/components/DecisionRangeTable.vue、decisionCommon/components/DecisionRangeDialog.vue
- 所属项目：太仓G；来源会话：e9e71106-e4a9-41fe-a2ee-72a4cf99c6d9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_route_misjudge",
  "source_extraction_id": "975f8cf81e1849d283acc90cad1435ef",
  "version": 1,
  "memory_type": "entities"
}
-->