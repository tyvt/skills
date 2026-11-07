# 动态路由注册竞态修复
苏州市房地产监测V3 修复登录后先跳落地页再挂动态路由导致 404 未授权的问题。

## 问题根因
- 登录后硬编码 `router.push('/todo')` 且路由守卫竞态使 `addRoute` 未完成即放行
- 访问未注册路径命中 `*` 通配符至 404

## 修复方案
- `router/index.js` 使用 `needsDynamicRoutes()` 与 `loadDynamicRoutes` 单例 Promise
- 确保动态路由注册完成后再跳转

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/164.md
- 涉及文件：router/index.js、store/modules/permission.js、utils/permission.js、views/login、main.js、store/modules/user.js、utils/ruoyi.js、views/home/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：5657d5ac-3d67-4095-b7de-c93ba44cfa41；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "router_dynamic_race",
  "source_extraction_id": "4ab1eb5ff2df476e89c5e40eba2a6f96",
  "version": 1,
  "memory_type": "entities"
}
-->