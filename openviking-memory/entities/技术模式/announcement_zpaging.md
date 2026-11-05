# 慧物业公告页改用z-paging
慧物业三个公告页(社区/街道/小区)此前在Android一直加载中，已全部改为z-paging并统一结构。

## 改动说明
- 新增共享hook：hooks/useAnnouncementPaging.js统一处理分页请求、公告数据映射、社区/街道code自动补全、失败调用complete(false)避免一直loading
- 三个公告页改用z-paging：community/announcement/index.vue、subdistrict/announcement/index.vue、project/announcement/index.vue
- 结构统一为顶部搜索栏+NoticeList列表，支持下拉刷新和上拉加载

## 其他调整
- pages.json补充z-paging的easycom配置
- NoticeList.vue新增showEmpty属性，避免与z-paging空状态重复展示
- useLoadMore.js已还原，不影响其他仍使用该hook的页面

## 验证与归属
- 需在Android真机回归：慧物业→社区公告/街道公告、小区公告页
- 涉及hooks/useAnnouncementPaging.js及三个公告页；来源会话ID：802b4a4d-97e9-4dbb-a0fe-201215024044

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "announcement_zpaging",
  "source_extraction_id": "96ccac645cc742a1b882af762db6e9aa",
  "version": 1,
  "memory_type": "entities"
}
-->