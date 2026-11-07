# 首页办件量分析数量同步修复
产品2.0 首页 `home/index.vue` 的「办件量分析」时间筛选与数量不同步问题已修复。

## 问题根因
- 选「当日」后 `currentTab=0`，进详情返回首页 `currentTab` 恢复默认 1（本周）但数量仍显示当日
- 诱因：tab 切换 DOM 复用未刷新、统计请求并发覆盖、页面缓存激活未重置

## 修复内容
- `:key="'task-stats-' + currentTab"` 强制重渲染数量区域
- `currentTaskStats` 计算属性安全读取当前 tab 数据
- `refreshStatsData()` 刷新前清空 `todoCount`/`bubbleList`/`lineData`
- `statsFetchSeq` 序号保护忽略过期响应；`activated` 钩子重置为「本周」

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`home/index.vue`、`home/index-wrapper.vue`、`views/index.vue`
- 所属项目：产品2.0；来源会话：d23cbaf7-ad9b-42a8-baa6-7897239ffefe

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_taskstats_fix",
  "source_extraction_id": "fe9e7839c3e6497a831416b10b84332b",
  "version": 1,
  "memory_type": "entities"
}
-->