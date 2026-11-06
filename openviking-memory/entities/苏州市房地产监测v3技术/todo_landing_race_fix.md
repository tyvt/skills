# 首页待办落地页竞态修复
苏州市房地产监测V3 项目修复部分账号登录后提示「页面未授权或不存在」的问题。

## 问题原因
- 登录后多处硬编码 `router.push('/todo')` 且 `DEFAULT_LANDING_PATH` 设为 `/todo`
- 待办页路由来自 `listRouters` 动态注册，真实 path 可能是 `/flowable/.../todo`，不一定是 `/todo`
- 路由守卫竞态：首次导航触发 `GetInfo` 后 `roles` 已有值但 `GenerateRoutes`+`addRoute` 未完成，再次进入守卫走 `roles.length > 0` 分支直接 `next()`，访问未注册的 `/todo` 命中通配符 `*` 跳转 `/404`

## 修复方案
- `router/index.js` 使用 `needsDynamicRoutes()`（`roles` 为空或 `addRoutes` 为空）+ `loadDynamicRoutes` 单例 Promise，保证菜单注册完成后再落地
- `utils/defaultLanding.js` 同步调整落地页逻辑

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：router/index.js、utils/defaultLanding.js、store/modules/permission.js、utils/permission.js
- 来源会话：5657d5ac-3d67-4095-b7de-c93ba44cfa41

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "todo_landing_race_fix",
  "source_extraction_id": "9e1ffa47190141f69bafb695413c998f",
  "version": 1,
  "memory_type": "entities"
}
-->