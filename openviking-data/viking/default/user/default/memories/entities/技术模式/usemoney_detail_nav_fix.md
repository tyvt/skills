# 用款申请详情路由误跳修复
苏州市房地产监测V3 修复非监管/重点/监管用款申请详情误跳转到非监管详情的路由问题。

## 原因
- 三类用款共用 `supervision/unblock/usemoney/detail`，但路由分别为 `general/usemoney`、`emphasis/usemoney`、`special/usemoney`
- `resolveListRoutePathHint` 只取末段 `usemoney` 无法区分菜单，`pickDetailRouteForList` 易命中非监管
- `buildTableIdNavigation` 实现先误用 `general/usemoney/{id}` 导致跳错

## 修改说明
- 修改 `zhi2-web-admin/src/utils/ruoyi.js`
- 对 `General|Special|Emphasis/usemoney` 列表/详情，pathHint 改为 `general/usemoney`、`special/usemoney`、`emphasis/usemoney`

## 涉及文件
- `zhi2-web-admin/src/utils/ruoyi.js`
- `supervision/unblock/usemoney/index.vue`、`supervision/unblock/guarantee/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：41805f07-b6a7-46c0-90b9-f28d770d61ab

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usemoney_detail_nav_fix",
  "source_extraction_id": "e053260580a2474bb0e49eda780f9845",
  "version": 1,
  "memory_type": "entities"
}
-->