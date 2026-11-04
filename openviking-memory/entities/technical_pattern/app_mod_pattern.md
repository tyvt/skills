# 应用管理功能改造模式
应用管理新做及改造功能沿用既有对接模式，全量核对接口文档并对接 SSO 登录登出。

## Description
- Postman 接口文档与前端全量核对
- SSO 登录登出对接 login.vue、api/portal/home.js、store/modules/user.js
- 子系统认证接口管理端无需调用

## 涉及文件（统一门户与系统）
- 统一门户平台.postman_collection.json
- zhi2-web-admin/src/views/unified/app/index.vue
- zhi2-web-admin/src/views/unified/app/detail.vue
- zhi2-web-admin/src/views/system/config/index.vue
- zhi2-web-admin/src/views/system/role/index.vue

## 涉及文件（首页与角色）
- zhi2-web-admin/src/views/home/index.vue
- zhi2-web-admin/src/views/home/RegisterLogin.vue
- zhi2-web-admin/src/views/system/role/detail.vue

## Relations
- 来源会话：7b1df1ff-b1f6-495a-9f5c-db13bcdbc794（extracted source=cursor）
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "app_mod_pattern",
  "source_extraction_id": "2fba8f8d0cda4c1c996d7f39cc34706e",
  "version": 1,
  "memory_type": "entities"
}
-->