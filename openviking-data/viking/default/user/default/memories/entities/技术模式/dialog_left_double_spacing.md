# 全局样式导致对话框左侧面板出现双倍间距
在苏州市房地产监测V3中，全局`zs-dialog`为`.dialog-left`定义了`margin-right: 20px; padding: 20px`；组件的新样式优先级相同且未覆盖该全局样式，导致左侧面板出现双倍间距。

## 问题根因
- `zs-select-dialog.vue`中的全局`.dialog-left`定义了`margin-right: 20px; padding: 20px`
- 组件的新样式优先级相同，未能替换全局样式

## 解决方案
- `BuildingUnitLazyTree.vue`使用选择器`.dialog-box .dialog-left.building-unit-lazy-tree` (0,4,0)
- `ContractDialog.vue`、`NoticeContractDialog.vue`、`buildingTreeDialog.vue`添加类`select-contract-dialog`/`select-notice-dialog`，并统一body的padding与面板的`gap: 16px`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/254.md
- 涉及文件: chooseHouseDialog.vue, BuildingUnitLazyTree.vue, ContractDialog.vue, buildingTreeDialog.vue, NoticeContractDialog.vue, HouseSelectDialog.vue, zs-select-dialog.vue, BuildingDialog.vue
- 所属项目: 苏州市房地产监测V3; Session: 7342d846-a274-472d-aa53-0402cfe58bdb; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_left_double_spacing",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 1,
  "memory_type": "entities"
}
-->