# 业主决策深链URL查询失败须消费topicvoteid
无锡H5业主决策深链在URL查询接口失败时也须清理topicvoteid，否则会反复弹窗或跳转陷入循环。

## 问题现象
- 小程序web-view嵌入H5，URL带topicvoteid（portal侧portal_topic_vote_id）时拉业主决策页
- 接口抛错时若只return false不清理URL/待执行动作，每次进首页都会再试，用户被困重复确认/跳转循环

## 根因
- `usePortal.openOwnerDecisionVoteH5` 先调getToken+getH5VoteUrl拉业主决策页地址
- tryAutoStartOwnerDecisionFromTopicVote与tryConsumeOwnerDecisionPostAction每次进首页都会再试

## 修复方案
- `fetchOwnerDecisionVoteUrl` 异常分支置failed=true
- finally里hideLoading后，失败时调用 `markOwnerDecisionConsumed()` 清portal_topic_vote_id、portalPostAction、返回路由并标记已消费
- 补toast「业主决策页面打开失败，请稍后重试」（延后50ms避免被hideLoading吞掉）
- 成功路径逻辑不变

## 验证与归属
- 来源会话：02076a8a-747c-4891-a785-497ddd2c8a97
- 代码基线：38bd192
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/hooks/usePortal.js、src/utils/portal.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "owner_decision_deeplink_bug",
  "source_extraction_id": "259ccd137522413f8a275a710d09c982",
  "version": 1,
  "memory_type": "entities"
}
-->