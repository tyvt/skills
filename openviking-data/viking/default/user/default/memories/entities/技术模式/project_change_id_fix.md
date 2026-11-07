# 项目备案变更ID解析修复
苏州市房地产监测V3 修复项目备案详情点「变更」后详情误用备案主键问题。

## 问题根因
- 从**项目备案详情**点「变更」进入 `/customerProjectChange/detail/add?projectId=原备案ID`
- 保存成功后路径变为 `/detail/{变更单ID}`，但 query 仍带 `projectId`
- 原 `getId()` 优先读 query 的 `projectId`，详情接口用备案主键而非保存返回的 `projectChangeId`

## 修复方案
- `ruoyi.js` — `resolveIdFromRoute`：路径末段已是业务主键时优先用路径 ID；`query.projectId` 仅作兜底（如列表跳转只有 query、无路径 ID 场景）
- `customerProject/changeDetail.vue` — `addCallback`：保存成功后用 `resolveResponseId(response, 'projectChangeId')` 跳转，并从 query 去掉 `projectId`

## 验证要求
- 已备案项目 → 变更 → 保存，确认详情请求体为 `projectChangeId`，页面数据为变更单内容

## 涉及文件与归属
- 涉及：`ruoyi.js`、`customerProject/changeDetail.vue`、`customerProject/auxiliaryProject/index.vue`、`buildingTable/components/projectForm.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：2771a096-b3e2-4777-978c-59d66df37c8e；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_change_id_fix",
  "source_extraction_id": "332cc5b2c96c4093aff81c5d14018372",
  "version": 1,
  "memory_type": "entities"
}
-->