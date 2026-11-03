# 慧物业菜单跳转丢小区ID
慧物业Tab进入后续页面时URL主键id为空、页面数据全空，由两处独立错误叠加导致。

## 问题根因
- buildMenuRouteContext取参读userStore.projectId/projectInfo，实际写入方只写userStore.project，读到undefined留空id
- fallback菜单路由码配错：小区信息误配1_1_0（业委会信息页）、社区公告误配2_0_4（小区信息页）

## 解决方案
- 统一取参口径为extra.project ?? extra.complexId ?? userStore.project ?? ''，改在buildMenuRouteContext一处生效
- 测试环境修正路由码：小区信息1_0_0、社区公告2_0_24
- 线上菜单来自服务端app.suzhufang.config，前端修好仍须后台同步修正url

## 验证与归属
- 验证会话：9f4ea5c1，用户报submit.vue的null.map报错及小区信息ID缺失
- 涉及文件：zhi2-mobile-shimin/src/utils/menuRouteMap.js、src/pages_tab/static/menus.fallback.json、src/pages_owner/authentication/owner/index.vue、src/pages_owner/repair/submit.vue
- 代码基线：83c4136

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "huifangwu_menu_id",
  "source_extraction_id": "2b4445ef78724ef68f75a93c4eeae34d",
  "version": 1,
  "memory_type": "entities"
}
-->