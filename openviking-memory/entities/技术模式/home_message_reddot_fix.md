# 首页消息通知未读红点返回不消失
物业手持B端首页消息通知点击查看详情返回后未读红点仍存在的问题及修复方案。

## 问题根因
- 首页 `applyMessages` 未读判断与消息列表不一致，且消息详情返回后列表未刷新导致红点残留

## 解决方案
- `src/pages/message/index.vue` 新增 `markMessageRead`：未读且有 `msgRangeId` 时调用 `updateReadFlag`，成功后本地 `item.unread = false`
- `openMessage` 改为 `async`，跳转详情或工单页前先执行 `markMessageRead`
- `onShow` 每次进入页面都会 `loadMessages({ reset: true })`，从详情返回会刷新列表
- `src/pages/home/index.vue` 的 `applyMessages` 未读判断由 `readFlag !== '1'` 改为 `readFlag === '0'`，与消息列表一致

## 关键文件
- 首页通知卡片（红点展示）：`src/pages/home/index.vue`
- 消息列表页：`src/pages/message/index.vue`
- 消息详情页：`src/pages/message/detail.vue`
- 消息 API：`src/api/msg.js`
- 首页消息拉取 API：`src/api/home.js`
- 路由配置：`src/pages.json`
- 无关/旧组件：`src/components/NoticeList.vue`（未接入当前首页流程）

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages/home/index.vue、src/pages/message/index.vue、src/pages/message/detail.vue、src/api/msg.js、src/api/home.js、package.json
- 来源会话ID：a15deb31-e978-46bc-a0d9-a8b7c5050469；关联调查会话 652779ed-8494-4c1a-86e5-496e1851f191
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_message_reddot_fix",
  "source_extraction_id": "859dfcfb9ffe4d1d902c1e904f6715fb",
  "version": 1,
  "memory_type": "entities"
}
-->