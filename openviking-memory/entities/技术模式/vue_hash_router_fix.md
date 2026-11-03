# hash模式路由无匹配修复
`createWebHashHistory()`下跳转未带`/#/`或动态路由`addRoute`晚于首次解析会导致无匹配。

## 问题根因
- 使用 `createWebHashHistory()` 时跳转未带 `/#/` 前缀
- 动态路由 `addRoute` 注册晚于首次路由解析

## 解决方案
- 统一带 `/#/` 跳转，或改 `createWebHistory()` 并配置 history fallback
- 确保路由注册完毕再访问动态路由

## 验证与归属
- 涉及文件：src/router/index.js
- 所属项目：2-0；代码基线：none
- 验证证据：src=2-0/017.md
- 来源会话ID：dab975d3-8f02-4099-9922-936f5a02194f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_hash_router_fix",
  "source_extraction_id": "1c14e868233949f988121dd48731d257",
  "version": 1,
  "memory_type": "entities"
}
-->