# 因ID字段名导致保存/查看预售计划失败
后端 `PresalePlanSaveVo` 返回 `presalePlanId` 而不是 `planId`；原始的 `plan/detail.vue` 使用 `resolveResponseId(res, 'planId')` 未能读取计划ID。

## 契约要点
- 后端 `PresalePlanSaveVo` 返回 `presalePlanId` 而非 `planId`
- 原始的 `plan/detail.vue` 使用 `resolveResponseId(res, 'planId')` 且未读取计划ID
- `extractPlanId` 改为接受两个字段，在保存成功时解析 `presalePlanId`
- E2E 辅助函数添加了 `extractPlanIdFromSaveResponse` 以确保数据流

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：77643a80-744f-419d-abfc-21a4685e8d9f
- 验证证据: src=苏州市房地产监测V3/109.md
- 涉及文件: presale/permit/components/detail.vue, presale/permit/permitConstants.js, presale/permit/plan/detail.vue, presale/permit/components/PermitPlanPanel.vue, e2e/fixtures/presale-permit-helpers.js, e2e/presale/presale-permit-real-api-flow.spec.js, presale/cashsale/plan/detail.vue, package.json
- 所属项目: 苏州市房地产监测V3; 会话: 77643a80-744f-419d-abfc-21a4685e8d9f; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_id",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 1,
  "memory_type": "entities"
}
-->