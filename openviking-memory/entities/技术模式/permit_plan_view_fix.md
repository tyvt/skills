# 预售方案查看按钮启用条件修复
苏州市房地产监测V3 中预售许可申请详情页「查看」按钮因 planId 被覆盖导致维护后仍灰显的修复。

## 问题原因
- 「查看」按钮启用条件为存在 `planId`（见 `PermitPlanPanel.vue` 中 `:disabled="!planId"`）
- 尚未维护预售方案时按钮灰显为预期行为，需先「维护」并保存方案
- 维护方案返回后 `consumePlanPageResult` 立即调用 `getDetail()`，申请单未再次保存前详情接口可能无 `planId`，覆盖刚拿到的 `planId` 导致按钮一直灰

## 修复要点
- `PermitPlanPanel.vue` 用 `resolvedPlanId` 统一从 `planId` 或 `plan.planId` 取值
- `detail.vue` 新增 `effectivePlanId` 做同样兜底
- `detailCallback` 在接口未返回时保留本地 `planId`/`plan`
- 去掉 `consumePlanPageResult` 中会冲掉 `planId` 的逻辑

## 涉及与归属
- 涉及文件：`PermitPlanPanel.vue`、`detail.vue`
- 项目：苏州市房地产监测V3；来源会话ID：c979272c-3442-49d7-883a-b7048db0acbc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_plan_view_fix",
  "source_extraction_id": "b4544ae815e34326a45b94c399c09bc2",
  "version": 1,
  "memory_type": "entities"
}
-->