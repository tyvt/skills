# 路由文件路径匹配未比对component
`getRouterPathByFilePath` 因未比对 `component` 字段导致工具函数失效。

## 问题根因
- `getRouterPathByFilePath` 仅比对 `meta.filePath`，忽略 `component` 字段
- 菜单节点 `meta.filePath` 可能为 `Layout`/`ParentView`，真实路径在 `component`

## 修复方案
- `routeMatchesFilePath` 改为 `meta.filePath` 或 `component` 任一命中
- `collectRoutesByFilePath` 优先扫描 `originalRoutes` 扁平数组
- 新增 `buildNavigationByFilePath` 优先用命名路由

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/044.md
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js、src/views/presale/permit/components/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：91b53615-9131-4fec-94ff-01cc463a59ef；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "router_filepath_component",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 1,
  "memory_type": "entities"
}
-->