# 菜单路由读取错误store字段且fallback码误配
苏住房C(zhi2-mobile-shimin)的 buildMenuRouteContext 读取不存在的 store 字段导致生成 URL 缺少 id，且 menus.fallback.json 路由码误配。

## 问题根因
- buildMenuRouteContext 读取不存在的 userStore.projectId / userStore.projectInfo 而非 userStore.project
- 导致生成 URL 缺少 id 参数
- menus.fallback.json 中小区信息、社区公告路由码误配

## 修复做法
- 改为读取 userStore.project
- 修正 menus.fallback.json 中对应路由码为 1_0_0 与 2_0_24

## 验证与归属
- 验证：会话 9f4ea5c1 用户反馈菜单路由跳转异常，agent 修正 store 字段读取与 fallback 路由码
- 涉及文件：src/pages_owner/repair/submit.vue、src/api/property.ts、src/api/property.js、src/pages_owner/authentication/owner/index.vue、src/pages_guard/index/index.vue、src/pages_transaction/publishHouse/houseList.vue、src/pages/property/index.vue、src/pages/index/components/menu/MenuSection.vue
- 验证证据：src=苏住房C/043.md；来源会话ID：9f4ea5c1-0697-4185-b730-1f8bb8246a06；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "menu_route_store_bug",
  "source_extraction_id": "2c47098b9b9847d2b91828f0ccce3081",
  "version": 1,
  "memory_type": "entities"
}
-->