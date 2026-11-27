---
audit_status: valid
last_checked: 2026-11-27T10:18:21+08:00
verdict_note: 苏州V3 路由信息.json 含 general/usemoney 类型前缀，ruoyi.js 存在，资金使用跳转加前缀修复无反证（pathHints 命名已变更）。
---
# 资金使用详情跳转缺少类型前缀

在项目 苏州市房地产监测V3 中，资金使用详情导航因缺少类型前缀而跳转到未监管页面。

## 问题根因
- `resolveListRoutePathHint` 仅捕获最后一段 `usemoney`，导致 `pickDetailRouteForList` 错误匹配到未监管路由 `general/usemoney/:tableid`。
- `buildTableIdNavigation` 优先采用此错误的匹配路径。

## 修复
- 在 `zhi2-web-admin/src/utils/ruoyi.js` 中，三个资金使用的 pathHints 改为 `general/usemoney`, `special/usemoney`, `emphasis/usemoney` 以区分路由。

## 涉及文件
- `src/views/supervision/unblock/usemoney/index.vue`, `guarantee/index.vue`, `bond/index.vue`, `usemoney/detail.vue`
- `src/mixins/listMixins.js`, `src/mixins/detailMixins.js`
- `src/utils/ruoyi.js`
- `路由信息.json`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据: src=苏州市房地产监测V3/187.md
- 来源会话: 41805f07-b6a7-46c0-90b9-f28d770d61ab
- 所属项目: 苏州市房地产监测V3; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usemoney_route_prefix",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 1,
  "memory_type": "entities"
}
-->