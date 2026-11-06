# 房屋限制管理跳转projectId传错修复
苏州市房地产监测V3中从「房屋限制管理」项目详情跳转后 findBuildingList 的 projectId 传错问题已修复。

## 改动要点
- `detail.vue` 的 `gotoLimitForm` 中 `query.projectId` 改为 `this.projectId`，与 `routeId` 一致
- `limitFormMixin.js` 新增 `getRouteProjectIdForLimitAdd()`、`parseQueryProjectId()`（字符串解析避免精度丢失）
- 新增态：`form.projectId = validProjectId || queryProjectId`（路由优先），不一致时 `console.warn`
- `mounted` + `$nextTick` 调用 `syncAddModeProjectIdFromRoute()`

## 涉及文件
- zhi2-web-admin/src/views/building/houseLimit/detail.vue
- zhi2-web-admin/src/views/building/houseLimit/limitFormMixin.js
- zhi2-web-admin/src/views/building/houseLimit/houseLimitConstants.js
- zhi2-web-admin/e2e/fixtures/house-limit-helpers.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：9dbeef03-9049-4ca9-a1ea-9be099c301e4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_limit_projectid_fix",
  "source_extraction_id": "ab84d021aea649a287e577acdb50812d",
  "version": 1,
  "memory_type": "entities"
}
-->