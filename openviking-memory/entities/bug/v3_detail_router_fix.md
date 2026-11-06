# 列表页进入详情页授权路由修复
苏州市房地产监测V3 中从列表页进入详情页频繁提示没有授权路由，已通过 ruoyi.js 与 listMixins.js 修复。

## 修改内容（ruoyi.js）
- 新增 `findRouterByFilePath`：静默查找路由，优先 `router.getRoutes()`，未命中回退 `store.state.permission.originalRoutes`，支持 `menuId`/`pathHint` 消歧，详情路由优先选含 `:tableid` 的项
- 新增 `buildDetailNavigation`：列表页跳转新增/查看/编辑统一入口，优先 `name` + `params.tableid` 导航，解析失败 fallback 为 `${listPath}/${id}` 拼接
- `getCurrentRouterByFilePath` / `getRouterPathByFilePath` 改为基于 `findRouterByFilePath`（对外显式跳转仍保留报错）

## 修改内容（listMixins.js）
- 列表页跳转逻辑接入 `buildDetailNavigation`

## 验证与归属
- 静态检查通过：price-filing-routes.spec.js
- 涉及文件：ruoyi.js、listMixins.js、main.js、router/index.js
- 所属项目：苏州市房地产监测V3；来源会话ID：36ca195f-8fdc-4441-adb2-4879e592fe8e

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "v3_detail_router_fix",
  "source_extraction_id": "ffad441a88ee4d7980bb4a86cbbef7dd",
  "version": 1,
  "memory_type": "entities"
}
-->