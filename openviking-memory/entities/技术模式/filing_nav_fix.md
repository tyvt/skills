# 价格备案详情导航修复
苏州市房地产监测V3 修复价格备案「备案列表」与「变更列表」共用页面时，变更菜单误进备案详情的问题。

## 问题根因
- 价格备案的「备案列表」与「变更列表」共用 `recordPriceMngSuzhou/index.vue`，列表点「查看」走公共方法 `buildDetailNavigation`
- 变更菜单（如 `countychange`、`citychange`）详情组件是 `changeDetail`，但导航仍按 `detail` 匹配路由
- `pathHint` 对不上任意 `detail` 路由时误命中第一个备案 `detail` 路由，从「价格备案变更(区县)」进了备案详情

## 修改内容
- 在 `zhi2-web-admin/src/utils/ruoyi.js` 的 `buildDetailNavigation` 中：当列表路由 `pathHint` 含 `change`（含 `countychange`、`citychange`、`filingschange`）时，解析 `changeDetail` 而非 `detail`
- 若解析到的路由 path/name 不包含当前 `pathHint`，视为无效，回退为 `列表路径/${id}`（如 `.../countychange/{priceRecordId}`），避免跳错备案详情
- 普通「价格备案(区县/市级)」「价格备案申请」等菜单逻辑不变

## 验证与归属
- 涉及文件：`recordPriceMngSuzhou/index.vue`、`zhi2-web-admin/src/utils/ruoyi.js`
- 所属项目：苏州市房地产监测V3
- 来源会话ID：dbc55dba-6010-4384-9d71-56be65335631

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filing_nav_fix",
  "source_extraction_id": "f16b3953e23c43639f5b40170e496d0f",
  "version": 1,
  "memory_type": "entities"
}
-->