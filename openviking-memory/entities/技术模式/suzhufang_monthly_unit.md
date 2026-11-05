# 苏住房G 月报统计单位列优化
苏住房G 项目在物业管理信息月报统计详情页新增「单位」列。
## 主要改动
- `monthlyReportStat/detail.vue` 在「工作内容」与「合计」间新增「单位」列，每行展示对应指标单位（人、个、平方米、万元）
- `monthlyReport.js` 的 `buildStatTableRows` 增 `unitName` 字段，统计页工作内容列不再拼接「(单位)」；`buildStatColumnWidths` 增单位列宽计算；`buildHierarchyCells` 支持 `showUnitInName`（填报页 true、统计页 false）
## 涉及文件与归属
- 涉及 `monthlyReportStat/detail.vue`、`monthlyReport.js`、`ReportItemsTable.vue`、`zs-input-number.vue`
- 所属项目：苏住房G；来源会话：c26ba994-cf69-448b-a0b6-d0646c71a5da；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_monthly_unit",
  "source_extraction_id": "47bc4314ee6040b39df5c2f234d4de2f",
  "version": 1,
  "memory_type": "entities"
}
-->