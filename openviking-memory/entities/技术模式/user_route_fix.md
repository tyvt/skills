# 常量路由占父级致动态路由失败修复
门户 constantRoutes 占用 /user 父路由导致后台用户管理动态路由注册失败跳 404，需释放父级并自动规范 Layout。

## Description
- 现象：constantRoutes 占用 /user 父路由，致使后台配置根路径 /user 的用户管理动态路由注册失败并跳 404。
- 涉及文件：zhi2-web-admin/src/router/index.js；src/utils/menuVisibility.js；src/store/modules/permission.js；src/api/portal/user.js；src/views/system/user/index.vue；Sidebar/RecursiveMenu.vue；src/utils/portalLayout.js；TagsView/index.vue
- 来源会话ID：18610eee-2927-456a-9953-3373bfd46585；代码基线：none；所属项目：门户

## Solution
- 于 router/index.js 将个人中心改为 /user/profile 释放 /user 父级。
- permission.js 对 listRouters 返回 /user 未包 Layout 的情况自动规范为 Layout + 默认子路由。

## Verification
- 验证证据：src=门户/016.md 记录该修复方案。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_route_fix",
  "source_extraction_id": "5b1f7a25d9f64601b3f9fb37f485a33b",
  "version": 1,
  "memory_type": "entities"
}
-->