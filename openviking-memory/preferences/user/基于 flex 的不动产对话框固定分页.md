- 在房产对话框中的分页栏被布局高度限制截断。BuildingTableViewTabs.vue 将表格区域的 min-height 改为 0，并使用 flex:1 配合内部滚动；分页栏使用 flex-shrink:0 固定，并添加 padding-bottom:4px。
- zs-select-dialog.vue 为 .dialog-right.building-table-right 补充了 display:flex, flex-direction:column, flex:1 以确保右侧布局高度。
- 涉及文件: d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/option/components/DecisionRangeTable.vue; d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingTableViewTabs.vue; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue; d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/option/detail.vue; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/SKILL.md; d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubElevMaintenanceIncome/detail.vue
- 验证: src=园区公共收益/022.md; 会话 e0c9e026-360f-4210-a247-b1f275759fea

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：e0c9e026-360f-4210-a247-b1f275759fea


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 基于 flex 的不动产对话框固定分页",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "preferences"
}
-->
