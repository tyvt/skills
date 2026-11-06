# 规划许可楼幢新增无反应修复
苏州市房地产监测V3 项目中，修复了编辑建设工程规划许可证时楼幢区域「新增」按钮无反应的问题。

## 原因
- `PlanLicRelatedBuildingTable.vue` 旧逻辑：无 `projectId` 时直接 `return` 且无提示
- 项目备案编辑时详情接口往往只带回 `projectName` 等字段，不一定带 `projectId`，导致点击「新增」像「没反应」

## 已做修改
- 增加 `resolveProjectId()`：依次从 `form`、`embedProject`（项目备案弹窗传入）、`outQueryParams`、路由 query 解析项目 ID
- 仍无项目 ID 时提示：「请先选择项目后再新增楼幢」
- 支持 `embed-project` 属性

## 涉及文件与验证
- `PlanLicRelatedBuildingTable.vue`、`planLic/detail.vue`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：9905b054-5a4d-48c1-a466-7afb0744f153

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "planlic_building_fix",
  "source_extraction_id": "49b89a2862454eb7a8ec7d3ff1097f82",
  "version": 1,
  "memory_type": "entities"
}
-->