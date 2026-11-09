# 学习园地页签单行横向滚动修复
苏住房防汛C端移动查询H5 中将学习园地页签改为单行展示、横向滚动并隐藏滚动条，不换行。

## 修改内容
- `src/styles/theme.css`（约 302–303 行）的 `.scroll-tabs` 定义为 `display:flex; flex-wrap:nowrap; white-space:nowrap; overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none` 并附加 `::-webkit-scrollbar{display:none}`
- 首页学习园地行 `<view class="scroll-tabs">` 位于 `src/pages/home/index.vue`
- 学习园地列表页 `<view class="tab-bar"><view class="scroll-tabs">` 位于 `src/pages/portal/list/index.vue`

## 验证与归属
- 提交 `97c9460`（“学习园地页签改为单行横向滚动并隐藏滚动条，不换行”），构建于 2026-11-09 14:35 重建
- 本地 nginx 8095 已部署并提供含 `flex-wrap:nowrap` + 隐藏滚动条规则的 CSS（`index-Dz3BEyrd.css`）
- 旧换行版本为 2026-11-09 上午的 `a7f8d1b` 构建，截图若显示换行即为过时视图
- 所属项目：苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scroll_tabs_fix",
  "source_extraction_id": "54d39551a6b74db8a59156978443487b",
  "version": 1,
  "memory_type": "entities"
}
-->