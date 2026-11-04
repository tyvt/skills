# 消息已读标记与首页校验不一致
在B-end物业管理移动应用中，消息详情未调用 updateReadFlag 标记为已读，且首页的未读校验与列表不一致；已通过新的标记和校验调整修复。

## 问题根因
- 消息详情未调用 updateReadFlag 标记为已读
- 首页 applyMessages 中的未读校验原本为 readFlag!=='1'，与列表不一致

## 解决方案
- 在 src/pages/message/index.vue 中添加 markMessageRead，并在 onShow 中更新列表
- 将 src/pages/home/index.vue 改为 readFlag==='0'

## 验证与归属
- 验证证据: src=物业手持B端/004.md
- 涉及文件: src/pages/home/index.vue, src/pages/message/index.vue, src/pages/message/detail.vue, src/api/msg.js, src/api/home.js, package.json
- 源会话: a15deb31-e978-46bc-a0d9-a8b7c5050469; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "read_flag_mismatch",
  "source_extraction_id": "926ca69557244270b1d93c4505f97348",
  "version": 1,
  "memory_type": "entities"
}
-->