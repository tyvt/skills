# 路由切换重置主内容区滚动位置（苏住房G）
苏住房G 已全局修复从详情页进入其他页面时主内容区滚动位置残留的问题。

## 问题原因
- Vue Router 虽配置 `scrollBehavior: () => ({ x: 0, y: 0 })`，但实际滚动容器为布局主内容区 `#app-main`（`AppMain.vue` 中 `overflow-y: auto`），而非 `window`
- 从「物业管理区域查询」详情页（已向下滚动）进入「前期物业合同备案」或「物业合同备案」时，`#app-main` 保留原滚动位置，新页面从中间开始显示

## 修复方案
- 在 `router/index.js` 的 `afterEach` 守卫中每次路由切换后重置 `#app-main` 滚动位置：`mainEl.scrollTop = 0` 并 `window.scrollTo(0, 0)`

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/router/index.js`、`zhi2-web-admin/src/layout/components/AppMain.vue`、`zhi2-web-admin/src/views/publicQuery/complex/index.vue` 等
- 所属项目：苏住房G；来源会话：a1789e06-01db-41b3-b240-eb61d9addf8b；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "router_scroll_reset",
  "source_extraction_id": "d8a74d1aab5b4d0b85d30ea4f6cc11b7",
  "version": 1,
  "memory_type": "entities"
}
-->