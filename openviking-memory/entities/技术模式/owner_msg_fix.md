# 业主决策消息点击无响应修复
苏住房C小程序「我的-消息」点击业主决策消息无响应，已通过旧路径兼容映射修复。

## 问题根因
- 分包改造后业主决策详情页实际路径为 /pages_vote/decision/detail
- 消息接口返回 msgUrl 仍为旧路径 /pages_owner/decision/detail，navigateTo 报页面不存在

## 修复内容
- 在 normalizePageUrl 增加旧路径兼容，映射前缀：pages_owner/decision/→pages_vote/decision/、pages_owner/elect/→pages_vote/elect/、pages_owner/poll/→pages_vote/poll/、pages_owner/propose/→pages_vote/propose/

## 涉及文件与归属
- 涉及文件：robot/index.vue、api/msg.js、pages.json、message/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：72fc01c4-8530-4edb-8ed0-13cf0599aa37；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_msg_fix",
  "source_extraction_id": "7abc9171dfa941c6b2fe9174722cd6ca",
  "version": 1,
  "memory_type": "entities"
}
-->