# facility.vue改用z-paging分页
泰兴小程序设施设备列表页 `facility.vue` 已改为使用 `z-paging` 分页，与维修项目等页面保持一致。

## 修改内容
- 移除 `useLoadMore`、`uni-load-more`、`ZsEmpty`，接入 `z-paging`。
- 搜索/筛选放入 `#top` 插槽，滚动时固定在顶部。
- `queryList` 负责分页请求，成功调用 `complete(rows)`，失败调用 `complete(false)`。
- 搜索、切换楼幢/单元时调用 `reload()` 重新加载，并修复原代码 `reload` 未定义问题。
- 下拉刷新、上拉加载更多、空状态由 `z-paging` 自动处理。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_facility/facility.vue、src/api/maintenance.js、src/pages_maintain_project/index.vue、src/hooks/useLoadMore.js、src/pages_facility/index.vue、src/pages_maintain_project/project.vue
- 来源会话ID：77ea70f5-2c1b-4d8c-9f54-46a209a8a7d4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_zpaging",
  "source_extraction_id": "d785119f5bb249119c9e3f841e480587",
  "version": 1,
  "memory_type": "entities"
}
-->