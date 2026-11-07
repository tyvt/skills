# 维修资金发起表决空白页
太仓G 点击「发起表决」后跳转维修资金表决新增页出现空白页，已定位修复路由名称不匹配与页面初始化报错两类问题。

## 问题根因
- 路由名称写死为 `OwnerDecision/maintain/:tableid`，重构后后台菜单实际为 `MaintainDecision/maintain/:tableid` 或 `estate/maintainDecision/detail`，路由对不上导致跳转失败或加载错误组件
- 表决详情页 `maintainDecision/detail.vue`、`ownerDecision/detail.vue` 多处直接使用 `$route.name.split('/')`，当路由没有 `name` 时抛异常致页面白屏

## 修复内容
- 在 `decisionCommon/config.js` 新增 `pushMaintainDecisionDetail()`：按后台菜单自动匹配正确路由（优先 `estate/maintainDecision/detail`），兼容 `MaintainDecision`/`OwnerDecision` 两种历史路由名
- 新增 `parseMaintainVoteSession()`：安全读取发起表决时预填的会话数据

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：`maintainDecision/detail.vue`、`ownerDecision/detail.vue`、`decisionCommon/config.js`、`fundUsageKs/steps/step4-5.vue`、`home/components/VoteTable.vue`
- 所属项目：太仓G；来源会话：5ba671bd-1b41-4095-aeb7-c9806fc7b5c2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintain_vote_blank_page",
  "source_extraction_id": "9ee9055e33c847f9aa90f22112539d10",
  "version": 1,
  "memory_type": "entities"
}
-->