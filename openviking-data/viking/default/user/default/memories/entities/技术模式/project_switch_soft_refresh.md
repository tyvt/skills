# 切项目软刷新复用 TagsView
园区物管2.0 中 Navbar 切换物业管理区域后改用 TagsView 软刷新，避免 window.location.reload() 整页白屏。

## 问题根因
- 原切换后调用 window.location.reload() 丢失路由上下文、重拉静态资源与登录态，体验差且慢。
- 项目已有 TagsView 的刷新当前页软刷新机制可复用。

## 解决方案
- 抽共享工具 src/utils/refreshView.js：refreshView（delCachedView 清缓存→清搜索参数缓存→/redirect 重进当前页重挂载）；refreshAfterProjectSwitch（清所有标签缓存+软刷新当前页）。
- TagsView 的 refreshSelectedTag 与 bProjectDialog 切区后改调该工具。
- 效果：保留路由与已开标签，只重挂当前组件，清缓存标签切回按新小区重拉数。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/utils/refreshView.js、zhi2-web-admin/src/layout/components/TagsView/index.vue、Navbar.vue、zhi2-web-admin/src/views/home/bProjectDialog.vue。
- 所属项目：园区物管2.0；来源会话：cdffd236-f18a-4eb7-a140-2c5914000510；代码基线：49e7729ce。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_switch_soft_refresh",
  "source_extraction_id": "6748b718b2a9471ca4346d124cc1977d",
  "version": 1,
  "memory_type": "entities"
}
-->