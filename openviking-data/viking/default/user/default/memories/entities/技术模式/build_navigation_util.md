# 公共路由解析工具 buildNavigationByFilePath 修复
苏州市房地产监测V3 中 `ruoyi.js` 的路由按文件路径查找工具已修复并新增 `buildNavigationByFilePath`。

## 真正原因
- 控制台匹配用 `(r.meta?.filePath || r.component) === 'presale/permit/plan/detail'`
- 原 `getRouterPathByFilePath` 内部只用 `meta.filePath === filePath` 判断
- 菜单节点经 `flattenTree` 后 `meta.filePath` 可能写成 `Layout`/`ParentView`，真正组件路径在 `component` 字段，导致工具函数找不到
- 方案页路由名 `PermitPlan/:tableid` 用 path 拼接在 `ParentView` 嵌套下易跳错

## 本次修改
- `routeMatchesFilePath`：与控制台一致，`meta.filePath` 或 `component`（字符串）任一命中即可
- `collectRoutesByFilePath`：优先直接扫描 `originalRoutes` 扁平数组
- 新增 `buildNavigationByFilePath`：优先用命名路由 `{ name: 'Per...' }`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`presale/permit/components/detail.vue`、`src/utils/ruoyi.js`、`property/spFeeBill/components/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话：91b53615-9131-4fec-94ff-01cc463a59ef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "build_navigation_util",
  "source_extraction_id": "828ec5e928bc4e768c9341b93118b60e",
  "version": 1,
  "memory_type": "entities"
}
-->