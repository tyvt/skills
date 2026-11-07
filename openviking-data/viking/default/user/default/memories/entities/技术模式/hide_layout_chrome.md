# 门户 hideLayoutChrome 布局逻辑
门户首页 `homeDataMixin` 与 `portalLayout.js` 控制顶栏横向菜单与侧栏完整菜单的显隐。

## 问题背景
- 首页 `homeDataMixin` 在 `created` 里把 `hideLayoutChrome` 设为 `true`（顶栏只保留 Logo/用户区，不显示横向 TopNav）
- 离开首页时 `beforeDestroy` 改回 `false`，导致从侧栏点「应用管理」等业务页时顶栏横向菜单再次出现

## 修改要点
- `portalLayout.js`：管理端（非 B 端或超级管理员）全程保持「侧栏完整菜单 + 无顶栏横向菜单」
- 登录后 `syncHideLayoutChrome`，进入业务页前即生效
- `homeDataMixin`：仅对非管理端用户在离开首页时恢复 `hideLayoutChrome`
- `TagsView` / `GenerateRoutes`：在 `hideLayoutChrome` 下始终用完整侧栏树，避免路由切换后按 TopNav 模式裁剪菜单

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证：刷新后从首页点侧栏「应用管理」等项，顶栏应始终无横向菜单项，仅左侧菜单 + 标签页
- 涉及文件：portalLayout.js、homeDataMixin.js、TagsView、GenerateRoutes、layout/index.vue
- 所属项目：门户；来源会话ID：40f4d280-b5c1-4c8e-8477-9f099246ba53；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "hide_layout_chrome",
  "source_extraction_id": "52c39ff7d9024162adeec53c60ddde30",
  "version": 1,
  "memory_type": "entities"
}
-->