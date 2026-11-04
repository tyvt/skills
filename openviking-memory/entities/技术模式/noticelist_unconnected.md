# NoticeList.vue 未连接到首页通知流
在B-end物业管理移动App中，首页通知红点的逻辑位于 home/index.vue，且 NoticeList.vue 是一个未连接的旧组件；消息接口依赖于 home.js 和 msg.js。

## 组件
- 首页通知红点的逻辑位于 src/pages/home/index.vue
- NoticeList.vue 是一个未连接到当前流的旧组件

## 接口依赖
- 消息接口依赖于 src/api/home.js 和 src/api/msg.js

## 验证与归属
- 验证证据: extracted source=cursor session=652779ed-8494-4c1a-86e5-496e1851f191
- 涉及文件: src/pages/home/index.vue, src/pages/message/index.vue, src/pages/message/detail.vue, src/api/msg.js, src/api/home.js, src/components/CustomTabbar/CustomTabbar.vue, src/pages/announcement/index.vue, src/pages.json
- 源会话: 652779ed-8494-4c1a-86e5-496e1851f191; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "noticelist_unconnected",
  "source_extraction_id": "926ca69557244270b1d93c4505f97348",
  "version": 1,
  "memory_type": "entities"
}
-->