# 待办跳转取ID修复
苏州市房地产监测V3 修复从待办跳转时未从路径取业务主键 ID 的问题。

## 问题根因
- 从待办进入时业务主键在 URL 末段或 `:tableid`（`navigateToTodoTask`→`buildTableIdNavigation`）
- 应通过全局 `getId()`（`@/utils/ruoyi.js` 的 `resolveIdFromRoute`）解析
- `DeveloperBasicInfoDetail` 原基本信息只调 `getOwnCompany` 忽略路径 ID；入网认证 `getEntryNetworkDetail()` 不传 `companyRecordId`

## 修改内容
- 新增计算属性 `routeCompanyRecordId`：`this.getId()` + `query.companyRecordId`（不用 `form.companyRecordId` 避免 B 端刷新误走 detail 接口）
- `getDetail`：有 `routeCompanyRecordId` 走 `getCompanyRecordDetail`，否则走 `getOwnCompany`
- `loadEntryNetworkDetail`：仅当路由有 ID 时调用 `getEntryNetworkDetail`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`@/utils/ruoyi.js`、`DeveloperBasicInfoDetail.vue`、`detailMixins.js`
- 所属项目：苏州市房地产监测V3；来源会话：34b3aff3-436f-4179-ac42-dfbfa838e9d3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_id_fix",
  "source_extraction_id": "62dedeb762f4419ea3e8f6efbbe1b55c",
  "version": 1,
  "memory_type": "entities"
}
-->