# 楼幢进度维护前补保存无ID楼幢并保持编辑态
未保存楼幢缺少 presalePermitBuildingId 致进度数据异常，进度维护前需补保存无 ID 楼幢并保持编辑态。

## 问题根因
- 未保存楼幢缺少 `presalePermitBuildingId`，导致进度数据异常

## 解决方案
- `detail.vue` 的 `openProgressDialog` 检测无 ID 楼幢后调用 `saveForProgress` 补保存，并 `refreshDetailSnapshot` 保持编辑态
- `PresaleBuildingTable.vue` 的 `handleProgressMaintain` 传递整行交由父组件处理

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/157.md
- 涉及文件：presale/permit/components/PresalePlanFillForm.vue、PresaleBuildingTable.vue、PresaleBuildingSection.vue、detail.vue、PresaleProgressDialog.vue、docs/commercial-contract-migration-api.md、e2e/fixtures/presale-permit-helpers.js、e2e/presale/presale-permit-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：4ad74818-9e10-4ec9-a586-ce529fd33e4b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_progress_save_noid",
  "source_extraction_id": "f6c19f19494240c78561d94bce477288",
  "version": 1,
  "memory_type": "entities"
}
-->