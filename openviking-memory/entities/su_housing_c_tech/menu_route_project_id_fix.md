
# 慧物业 Tab 小区信息页 URL 生成错误修复
苏住房C慧物业 Tab 进入页面时小区信息 URL 生成错误（id 为空），已修复 userStore 读取字段与菜单 fallback 配置。

## 问题根因
- 小区 ID 未正确读取：userStore.setProjectInfo 把当前小区写入 userStore.project，但 buildMenuRouteContext 读取不存在的 userStore.projectId / userStore.projectInfo，生成 URL 为 /pages_owner/project/info/index?id=
- 菜单配置路由码错误：menus.fallback.json 中小区信息误配为 1_1_0（业委会信息页），社区公告误配为 2_0_4（小区信息页）

## 修复方案
- 改为读取 userStore.project
- menus.fallback.json：小区信息改为 1_0_0（小区信息页），社区公告改为 2_0_24（社区公告页）
- menuRouteMap.js 修复对所有菜单跳转生效
- 若线上菜单来自服务端配置（app.suzhufang.config），需后台同步修正「小区信息」url 为 1_0_0

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：menus.fallback.js、menuRouteMap.js、app.suzhufang.config、pages_owner/repair/submit.vue、api/property.ts、api/property.js、pages_owner/authentication/owner/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：9f4ea5c1-0697-4185-b730-1f8bb8246a06；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "menu_route_project_id_fix",
  "source_extraction_id": "b4dab85f66b143b3b0951d4f778fb563",
  "version": 1,
  "memory_type": "entities"
}
-->