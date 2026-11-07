# Summary
Both the `/index` static route and `flowable/todo` interface route set `affix: true`, and `TagsView` additionally pinned `path === 'index'`, causing duplicate pinned todo-task tags. Fixed by removing the static `/index` affix in `permission.js` and adjusting `filterAffixTags` to pin only one tag matching `homeRoutePath`, deleting the `path === 'index'` special case.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】多处affix设置致待办任务标签重复固定
【内容】`/index` 静态路由与 `flowable/todo` 接口路由均设 `affix: true`，且 `TagsView` 对 `path === 'index'` 额外固定，导致待办任务标签重复。`permission.js` 移除静态 `/index` 的 `affix`，调整 `filterAffixTags` 仅在与 `homeRoutePath` 一致路径固定一个，并删除 `path === 'index'` 特殊处理。
【验证证据】src=园区公共收益/014.md
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/flowable/todo.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/router/index.js ; d:/repository/园区公共收益/zhi2-web-admin/src/store/modules/permission.js ; d:/repository/园区公共收益/zhi2-web-admin/src/views/home/index-wrapper.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/layout/components/Navbar.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/layout/components/TagsView/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/utils/ruoyi.js ; d:/repository/园区公共收益/zhi2-web-admin/src/views/login.vue
【来源会话ID】3bcff305-97a0-45ac-a995-1878bd7ee92b
【代码基线】none

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "event_name": "duplicate_affix_tags",
  "goal": "Fix duplicate todo tags",
  "summary": "Both the `/index` static route and `flowable/todo` interface route set `affix: true`, and `TagsView` additionally pinned `path === 'index'`, causing duplicate pinned todo-task tags. Fixed by removing the static `/index` affix in `permission.js` and adjusting `filterAffixTags` to pin only one tag matching `homeRoutePath`, deleting the `path === 'index'` special case.",
  "ranges": "14-19",
  "source_extraction_id": "7edae260dc5b4c619dbc8dc085a84546",
  "version": 1,
  "memory_type": "events"
}
-->
