# 首页路由重复注册与旧版 UI 修复（苏住房G）
苏住房G 点左侧菜单栏出现旧版首页的问题已修复，统一路由映射并避免动态路由重复注册。

## 修复内容
- `permission.js`：`home/index`、`home/index-v2` 统一映射为 `home/index-wrapper`（loadView 与动态路由解析均生效）；仅对可注册的 `rewriteRoutes` 执行 `stripDuplicateHomeRoutes`，避免动态路由再注册一套 `/index`；侧栏菜单数据不变仍显示「首页」
- `index.vue`：改为只渲染 `index-wrapper`，即使菜单仍指向 `home/index` 也不会再出现旧版 UI
- `index-v2.vue`：去掉 `toggleSideBar`；侧栏已展开时调用 `closeSideBar({ withoutAnimation: false })`，避免再次进入首页时侧栏被误打开
- E2E：`home-v2-mocks.js` 同步更新

## 验证与归属
- 涉及文件：`permission.js`、`index.vue`、`index-v2.vue`、`home-v2-mocks.js`
- 所属项目：苏住房G；来源会话：10a04453-cfe1-4e12-bc8d-4924c1089947；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_route_fix",
  "source_extraction_id": "fce90f19d6d64b639430b16da63eef9f",
  "version": 1,
  "memory_type": "entities"
}
-->