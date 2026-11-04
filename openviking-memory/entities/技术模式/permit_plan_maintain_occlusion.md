# PermitPlanPanel 用空图像隐藏维护按钮
在 苏州市房地产监测V3 中，`PermitPlanPanel` 在未维护且不可操作时渲染空图像，覆盖了维护入口。

## 问题根因
- `PermitPlanPanel` 在未维护且 `operable===false` 时渲染 `AppendixEmpty`
- “维护”按钮仅在 `operable===true` 时出现；图像覆盖入口

## 修复
- `PermitPlanPanel.vue` 在未维护时移除空图像
- 添加 `showMaintainButton` （当非只读且可编辑或未维护时显示）
- `detail.vue` 传递 `planPanelReadonly` 和 `canOperatePlan` 以对齐按钮和导航

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/073.md
- 涉及文件: AppendixRequirementCard.vue, PermitInfoPanel.vue, PermitPlanPanel.vue, detail.vue, Headline/index.vue, AppendixEmpty/index.vue, index.vue, CashsaleDetail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 5c95c517-e8ad-4225-b0de-55c6271384c8; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_plan_maintain_occlusion",
  "source_extraction_id": "f3025b0b72ad4d9da2b7a5d18356898a",
  "version": 1,
  "memory_type": "entities"
}
-->