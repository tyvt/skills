# Notice Empty State
将公告页面的空状态标准化以使用 NoticeList 组件。

## 变更
- 从项目、社区和街道的公告页面中移除了重复的 ZsEmpty 组件
- 三个公告列表页面使用 NoticeList 来渲染空状态
- 避免重复显示“暂无数据”（无数据）

## 涉及的文件
- src/pages_owner/project/announcement/index.vue
- src/pages_owner/community/announcement/index.vue, components/NoticeList.vue
- src/pages_owner/subdistrict/announcement/index.vue
- src/components/ZsEmpty/ZsEmpty.vue, src/pages_owner/committee/application/announcement.vue
- src/pages_owner/subdistrict/components/InfoEntry.vue, src/hooks/useLoadMore.js

## 来源
- 来源会话: 53374cb4-01f1-44e3-b0b4-f4cca8826844
- 所属项目: zhi2-mobile-shimin

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "notice_empty_state",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "entities"
}
-->
