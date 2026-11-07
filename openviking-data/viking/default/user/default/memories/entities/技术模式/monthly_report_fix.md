# 月报详情页表格设计修复（苏住房G）
苏住房G 月报详情页表格已按设计修复，对齐表头与数据列。

## 修复内容
- 数据列错位根因：`monthlyReport.js` 的 `buildHierarchyCells` 对 2 级路径未补齐第 3 列，改为渲染空占位 `<td>`，保证每行占满 3 列工作内容
- 新增「填写说明」列：新增 `buildInstructionCells`，父级 `fillInstruction` 按子叶子行数纵向合并；`ReportItemsTable.vue` 在备注后增加该列并移除 tooltip 图标
- 历史累计 `/`：支持 `historyEditable`（`false`/`0`/`'0'` 不可填），不可填显示 `/`、校验跳过、保存 `historyValue` 传 `null`
- UI 对齐原型：编辑态表头本月/本年/历史列加红色 `*`

## 涉及文件
- `zhi2-web-admin/src/utils/monthlyReport.js`
- `zhi2-web-admin/src/views/publicQuery/monthlyReport/components/ReportItemsTable.vue`
- `zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue`

## 验证与归属
- 所属项目：苏住房G；来源会话：ca0c8cb4-e598-4bef-a3fa-f4d0b0a3266c
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_fix",
  "source_extraction_id": "860342b9e35444b492cc9a51f5ff3149",
  "version": 1,
  "memory_type": "entities"
}
-->