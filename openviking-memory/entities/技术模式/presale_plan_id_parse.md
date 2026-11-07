# 预售计划 ID 解析 Bug
预售计划的视图因为没有从返回值 `presalePlanId` 中解析出 ID 而显示为空。

## 描述
- 后端 `PresalePlanSaveVo` 返回 `presalePlanId` 而不是 `planId`。
- `plan/detail.vue` 使用了 `resolveResponseId(res, 'planId')` 并且没有读取到 ID。

## 解决方案
- 修改为 `extractPlanId(res.data)` 以解析计划 ID。
- E2E 辅助函数新增了 `extractPlanIdFromSaveResponse`。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：77643a80-744f-419d-abfc-21a4685e8d9f
- 验证证据: src=苏州市房地产监测V3-rest/069.md
- 涉及文件: presale/permit/components/detail.vue, permitConstants.js, permit/plan/detail.vue, PermitPlanPanel.vue, e2e/fixtures/presale-permit-helpers.js, e2e/presale/presale-permit-real-api-flow.spec.js, presale/cashsale/plan/detail.vue, package.json
- 所属项目: 苏州市房地产监测V3; 会话: 77643a80-744f-419d-abfc-21a4685e8d9f; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_id_parse",
  "source_extraction_id": "871325fa12334107afbf4d507d0400dd",
  "version": 1,
  "memory_type": "entities"
}
-->