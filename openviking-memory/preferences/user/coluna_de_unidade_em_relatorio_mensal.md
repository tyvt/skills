- `monthlyReportStat/detail.vue` 在“工作内容”和“合计”之间添加单位列。
- `monthlyReport.js` 函数 `buildStatTableRows` 增加 `unitName`；`buildHierarchyCells` 使用 `showUnitInName` 来区分统计页面 (false) 和填报页面 (true)。
- 涉及文件: ReportItemsTable.vue, zs-input-number.vue, monthlyReport.js, detail.vue, TemplateTreeTable.vue, zs-input.vue, monthlyReportStat/detail.vue, package.json.
- 验证证据: src=苏住房G/037.md; 会话: c26ba994-cf69-448b-a0b6-d0646c71a5da.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 月度报告中的单位列",
  "source_extraction_id": "c6f4b8de214b47529df7b54c7e26ac75",
  "version": 1,
  "memory_type": "preferences"
}
-->
