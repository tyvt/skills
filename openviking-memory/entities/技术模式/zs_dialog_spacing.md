# zs-dialog 样式优先级平局导致双重间距
在苏州市房地产监测V3中，`zs-dialog` 的全局样式 `.dialog-left` (`margin-right:20px;padding:20px`) 与新的组件样式优先级平局且未生效，导致对话框左侧面板出现双重间距。

## 问题根因
- `zs-dialog` 的全局样式 `.dialog-left` 带有 `margin-right:20px;padding:20px`
- 新的组件样式优先级平局且未被应用
- 导致对话框左右面板之间出现双重间距

## 解决方案
- `BuildingUnitLazyTree.vue` 将选择器提升为 `.dialog-box .dialog-left.building-unit-lazy-tree`
- `ContractDialog.vue`、`NoticeContractDialog.vue`、`buildingTreeDialog.vue` 添加了特定类并覆盖了 `gap:16px`，移除了 `margin-right` 并调整了 `padding`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/054.md
- 涉及文件: chooseHouseDialog.vue, BuildingUnitLazyTree.vue, ContractDialog.vue, buildingTreeDialog.vue, NoticeContractDialog.vue, HouseSelectDialog.vue, zs-select-dialog.vue, BuildingDialog.vue
- 所属项目: 苏州市房地产监测V3; 会话: 7342d846-a274-472d-aa53-0402cfe58bdb; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_spacing",
  "source_extraction_id": "cdba16e1b48b43e19c67c704e7a4b0f6",
  "version": 1,
  "memory_type": "entities"
}
-->