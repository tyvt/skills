# Portal 菜单路由改为后端直出 Router 树
产品2.0 门户菜单路由来源从「前端拼树」切换为后端直出（GET /portal/menu/listRouters）。

## 问题背景
- 原先 getPortalRouters 调 GET /portal/menu/list 拉菜单列表后，由前端按 menuType/appId 过滤并手动组装 Layout/ParentView/组件路径
- 新接口直接返回与系统 listRouters 结构一致的 Router 树，菜单过滤/去重/排序/hidden/孤儿子菜单提升为根节点等逻辑全部由后端完成

## 解决方案
- api/portal/menu.js 直接调 listRouters；登录 → router 守卫 GenerateRoutes → getPortalRouters() → permission.js filterAsyncRouter 解析 component
- permission.js 无需改动（已支持 Layout→@/layout/index.vue、ParentView、InnerLink、loadView）
- 注意 portalApiRewrite.js 已有 /system/menu/listRouters → /portal/menu/listRouters 重写规则，旧路径会落到同一接口
- 改后需清 sessionStorage 的 routers 缓存或重新登录才生效

## 验证与归属
- 验证证据：会话 f27acfa1 最终结论：api/portal/menu.js 改调 listRouters，permission.js 复用 filterAsyncRouter，portalApiRewrite.js 存在重写规则，需清 sessionStorage routers 缓存
- 涉及文件：zhi2-web-admin/src/api/portal/menu.js；zhi2-web-admin/src/store/modules/permission.js
- 所属项目：产品2.0；来源会话ID：f27acfa1-8278-4e4b-8253-349e3d4f24e5；代码基线：产品2.0/zhi2-web-admin（苏房V3同源），基线 1d563df

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_menu_list_routers",
  "source_extraction_id": "b2b84215894c4ce686e5d8228693700e",
  "version": 1,
  "memory_type": "entities"
}
-->