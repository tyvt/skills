# 弹窗左侧间距双重间距修复
苏州市房地产监测V3 中多处弹窗因全局 zs-dialog 样式与组件样式优先级打平，导致左面板与右侧出现双重间距，已统一修复。

## 根因
- 全局 zs-dialog 样式 .dialog-left 自带 margin-right: 20px; padding: 20px，弹窗 body padding: 30px
- 组件内新样式与全局选择器优先级打平未生效，导致左面板与右侧之间出现双重间距

## 修复内容
- BuildingUnitLazyTree.vue：左面板选择器提升为 .dialog-box .dialog-left.building-unit-lazy-tree（0,4,0），确保 margin-right: 0、padding: 20px 16px 16px 压过全局样式
- ContractDialog.vue（选择合同）、NoticeContractDialog.vue（选择合同号）：加 select-contract-dialog 类，body 内边距 20px 24px 24px、左右面板 gap: 16px、去除左面板 margin，与 chooseHouseDialog 一致
- buildingTreeDialog.vue（选择缴款通知书）：加 select-notice-dialog 类并统一间距覆盖，左面板样式选择器同步提升优先级

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：BuildingUnitLazyTree.vue、ContractDialog.vue、NoticeContractDialog.vue、buildingTreeDialog.vue、chooseHouseDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：7342d846-a274-472d-aa53-0402cfe58bdb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_spacing_fix",
  "source_extraction_id": "420b7220f7dc4216a77d93e5c54337e6",
  "version": 1,
  "memory_type": "entities"
}
-->