# 首页静态别名重定向
stripDuplicateHomeRoutes 裁掉 /index/home 后守卫 canonicalize 来不及，须在 constantRoutes 加静态别名重定向。

## 问题现象
- 侧栏点「首页」进 /index/home 弹「页面未授权或不存在」，常伴随落入 `*` → /404 再被守卫改写
- 菜单仍可能 push /index/home 或 /index/index，这些 path 已无匹配记录

## 根因链
- permission.js 注册动态路由时 stripDuplicateHomeRoutes 删掉 /index 树下 home/index 子路由，避免覆盖静态首页
- beforeEach 里 canonicalizeHomePath 把别名归一到 /index 发生在路由解析之后，救不了未匹配
- 先命中 path: '*' 兜底 → 404/未授权提示

## 修复方案
- 在 router/index.js 的 constantRoutes、且排在 `*` 之前增加静态重定向 `{ path: '/index/home', redirect: '/index' }` 与 `{ path: '/index/index', redirect: '/index' }`
- 排查时同时看 utils/homeRoute.js 的 strip/canonical 与 RecursiveMenu 的 push 目标是否一致

## 验证与归属
- 验证：会话 a4d2b610（基线 89672a4）用户点侧栏首页报未授权；结论为 stripDuplicateHomeRoutes 裁子路由 + canonicalizeHomePath 在解析后执行；在 constantRoutes 增加 /index/home、/index/index → /index 静态重定向
- 涉及文件：zhi2-web-admin/src/router/index.js、zhi2-web-admin/src/utils/homeRoute.js、zhi2-web-admin/src/store/modules/permission.js、zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- 所属项目：惠山二期G；来源会话：a4d2b610-041f-4020-b150-da4ace92e015；代码基线：89672a4
- 关联：已知「侧栏首页归一到 /index」只解决链接与高亮，未注册别名 path 仍会踩本条

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_static_redirect",
  "source_extraction_id": "b8d1b824386849719a7c6ed2c31fbe1a",
  "version": 1,
  "memory_type": "entities"
}
-->