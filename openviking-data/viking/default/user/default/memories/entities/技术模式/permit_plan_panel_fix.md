# 预售方案区块展示逻辑修复
苏州市房地产监测V3 调整了 `PermitPlanPanel` 未维护且无操作权限时的展示逻辑，避免出现只有缺省图没有维护按钮的情况。

## 问题原因
- `PermitPlanPanel` 在未维护且 `operable === false` 时渲染 `AppendixEmpty`（缺省图 +「预售方案未维护」）
- 「维护」按钮仅在 `operable === true` 时显示，导致只有缺省图、没有维护入口

## 修复要点
- `PermitPlanPanel.vue` 去掉未维护时的缺省图，新增 `showMaintainButton`：非只读且（可编辑或尚未维护）时显示「维护」
- `detail.vue` 传入 `planPanelReadonly`（主管部门节点/查看态为只读），增加 `canOperatePlan` 使跳转方案页与按钮展示规则一致
- 企业端编辑且方案未维护时标题右侧显示「维护」+「查看」，下方仅保留说明文案

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`PermitPlanPanel.vue`、`detail.vue`、`AppendixRequirementCard.vue`、`PermitInfoPanel.vue`
- 来源会话：5c95c517-e8ad-4225-b0de-55c6271384c8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_plan_panel_fix",
  "source_extraction_id": "1b78f2ac900543eeacc8a52008582c1e",
  "version": 1,
  "memory_type": "entities"
}
-->