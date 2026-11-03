# 路由元信息缺标题致操作日志模块名为空
园区公共收益项目中，路由元信息缺失 title 导致操作日志模块名缺失，已增强路由 meta 回溯逻辑。

## 问题根因
- getPageRequestHeaders() 仅从 router.currentRoute.meta 读取菜单名
- 新增页、hidden 路由及子路由未配 title 时 zs-menu-name 为空，后端日志「操作模块」缺失

## 解决方案
- 在 pageRequestContext.js 增强 resolveRouteMeta 回溯父路由 meta
- 或补充路由配置 title

## 验证与归属
- 来源会话：020b4402-aa87-4f14-bc0e-617da146dbe4
- 涉及文件：system/operlog/index.vue、utils/request.js、utils/pageRequestContext.js、utils/index.js、router/index.js、store/modules/permission.js、mixins/form.js、mixins/listMixins.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_meta_title",
  "source_extraction_id": "aba4a2b6479d4f45a2363f3e0f9679b4",
  "version": 1,
  "memory_type": "entities"
}
-->