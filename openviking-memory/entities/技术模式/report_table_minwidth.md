---
audit_status: valid
last_checked: 2026-11-26T11:35:29+08:00
verdict_note: 实机核对苏住房G monthlyReportStat/detail.vue-31表格用-style={minWidth-...}，262-263行.stat-table{width-100%}，与记忆内联width改minWidth并恢复样式width-100%描述一致。
---
# 月报表格留白修复
苏住房G项目月报页将表格内联 width 改为 minWidth 并恢复样式 width:100% 以解决留白问题。
## 改动要点
- publicQuery/monthlyReportStat/detail.vue：表格内联 width 改为 minWidth。
- 样式表 .stat-table 恢复 width: 100%，宽屏铺满容器、窄屏触发横向滚动。
## 验证与归属
- 所属项目：苏住房G；来源：苏住房G/047.md。
- 涉及文件：monthlyReportStat/detail.vue、index.vue、utils/monthlyReport.js、StatsTableSection.vue 等。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "report_table_minwidth",
  "source_extraction_id": "648ee6c78c33403d80340cd311a1737b",
  "version": 1,
  "memory_type": "entities"
}
-->