# 月报单位拼接到工作内容标题
苏住房G 项目月报模块将单位从数据列移到「工作内容」叶子标题中。

## 改动说明
- monthlyReport.js 新增 `formatItemNameWithUnit(itemName, unitName)`，格式为 `有编制(名)`
- buildHierarchyCells 中仅最末级叶子节点拼接单位，父级标题（如「基础信息」）保持不变
- ReportItemsTable.vue 移除本月/本年/历史三列中的单位 `<span>`，删除 `.unit-name` 样式

## 验证结果
- `formatItemNameWithUnit('有编制', '名')` → `有编制(名)`
- 父级标题仍为 `基础信息` 不带单位；月报统计页 buildStatTableRows 同步显示带单位标题；无 linter 报错

## 验证与归属
- 涉及文件：monthlyReport.js、ReportItemsTable.vue、monthlyReportStat/detail.vue
- 所属项目：苏住房G；来源会话ID：fc2d65aa-925d-4392-8380-99f01fdcc150

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_unit_title",
  "source_extraction_id": "9d36e0008f33493084394e9c26960c81",
  "version": 1,
  "memory_type": "entities"
}
-->