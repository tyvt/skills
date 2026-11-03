# 门户铃铛提示没有授权的根因与修复
固定或隐藏路由（如消息中心）后端菜单不下发，前端未显式注册导致点铃铛提示「没有授权」，实际是路由缺失而非权限问题。

## 问题现象
- 门户右上角铃铛点击后提示「没有授权」，但用户确有对应菜单权限
- 同类表现：跳转时把 component: "Layout" 的壳菜单当有效组件，点了直接打开 Layout 壳而非目标页

## 根因
- 本项目路由绝大部分由后端菜单动态下发（listRouters）
- 消息中心等固定或隐藏路由后端菜单没有、不会下发，前端不显式注册就没有路由

## 修复做法
- 后端不下发但前端要直达的固定页须在 src/router/index.js 的 constantRoutes 显式注册
- 判别信号：页面在菜单管理搜不到但用户确实要能点进去
- 排查时先分清路由未注册（前端补注册）vs 路由注册但权限串不对（后端菜单权限）
- 权限判定逻辑在 src/utils/ruoyi.js，固定路由命中时不要再按菜单权限判定

## 验证与归属
- 来源会话 session-7bb9e4cf-3051-4312-9646-5446cebb8f9e（基线 89e5947），禅道 Bug 5756
- 远端 HEAD 提交 0fd25ef15 fix(router): 消息中心注册固定隐藏路由，修复门户铃铛提示没有授权
- 涉及文件 router/index.js、utils/ruoyi.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bell_no_auth",
  "source_extraction_id": "34b9df83b44044cdbe3cd35475c05a76",
  "version": 1,
  "memory_type": "entities"
}
-->