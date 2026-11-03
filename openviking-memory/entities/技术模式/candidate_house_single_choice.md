# 筹备组户室选择列表与楼盘表互斥单选
园区公共收益项目(zhi2-web-admin)中 BuildingTable 新增单选模式，使楼盘表与列表视图在候选人征集选户室时互斥只选一条。

## 单选模式实现
- BuildingTable.vue 新增 singleChoice prop 与 clearAllChecked()，单选模式隐藏单元复选框并点选时清除其他选中
- CandidateDialog.vue 通过 enforceSingleChecked() 与 onCellClick() 确保切回列表视图时最多一条选中

## 兼容与默认行为
- 多选场景默认不传 singleChoice prop，行为保持不变
- 涉及 zs-select-dialog.vue、BuildingTableViewTabs.vue、RangeTable.vue 等组件协同

## 验证与归属
- 验证证据：src=园区公共收益/031.md
- 来源会话：52f8bcba-f213-44d2-86e9-611498aa1a67；代码基线：none
- 所属项目：园区公共收益
- 涉及文件：BuildingTable.vue、CandidateDialog.vue、BuildingTableViewTabs.vue、zs-select-dialog.vue、RangeTable.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_house_single_choice",
  "source_extraction_id": "13c16ab160ac4869a18df923a3d00ffb",
  "version": 1,
  "memory_type": "entities"
}
-->