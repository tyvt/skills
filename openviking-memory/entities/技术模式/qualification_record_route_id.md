# 企业资质信息页路由 ID 解析修复
苏州市房地产监测V3 中「企业资质信息」页（`toB/qualificationRecord/detail.vue`）调用 `getByCompanyRecordId` 前误用 `getId()` 导致显示「暂无资质」，已修复。

## 问题根因
- 该菜单路由往往无 `:tableid`，`getId()` 会从路径误解析主键或得空/占位值，请求出现空 `tableId` 或错误 ID，接口失败显示「暂无资质」

## 修改内容
- `detail.vue` 新增 `resolveCompanyRecordIdFromRoute()`，按顺序取 `query.companyRecordId` → `query.dataId` → `params.tableId/tableid` → `store.companyRecordId`，用 `isNavigableDataId` 校验；仍无有效 ID 时调 `getOwnCompany`（企业端本企业）
- `qualificationRecord.js` 的 `getQualificationRecordByCompanyRecordId` 改为发送 `{ companyRecordId }` JSON 体（与 `companyRecord/detail` 一致）并校验

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`toB/qualificationRecord/detail.vue`、`qualificationRecord.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：820a25c0-5a45-41d9-865f-d7522e1dde98；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_record_route_id",
  "source_extraction_id": "b4d7c66a115e439a926be64696a6d02d",
  "version": 1,
  "memory_type": "entities"
}
-->