# 月报统计详情页第一列定宽修复
苏住房G项目zhi2-web-admin的monthlyReportStat详情页修复第一列固定280px宽度问题。

## 问题根因
- 模板虽写了 i === 0 ? 280，但实际未生效：buildStatColumnWidths仍会根据内容撑开第一列；表格使用width: max-content，列宽被内容顶开；全局white-space: nowrap导致工作内容列无法换行。
- 后续发现模板用了独立computed的tableWidth，在HMR热更新时可能未正确注册。

## 修改内容
- monthlyReport.js：新增常量STAT_HIERARCHY_FIRST_COL_WIDTH = 280；expandSpanWidths跳过固定列，超长内容只撑开第2、3列；计算结束时强制hierarchy[0] = 280；在buildStatColumnWidths返回值中增加tableWidth字段（各列宽度之和）。
- detail.vue：用tableWidth显式设置表格总宽，去掉width: max-content；colgroup第一列使用常量firstColWidth；工作内容列（.hierarchy-cell）允许换行；模板改为使用已有的columnWidths.tableWidth。
- 移除多余的tableWidth computed和firstColWidth（第一列280px已在工具函数中统一处理）。

## 最终结果
- 第一列固定280px，第2、3列仍按内容自适应，合计及各区列逻辑不变。

## 验证与归属
- 涉及文件：src/utils/monthlyReport.js、src/views/publicQuery/monthlyReportStat/detail.vue
- 所属项目：苏住房G；来源会话：301c71a8-70fb-4e92-869b-d3c68a2a8c7b、e2b799d6-2c74-4d75-98c4-123b9c9d51db
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_col_fix",
  "source_extraction_id": "c9abe6077036411c8acf95c2da863d62",
  "version": 1,
  "memory_type": "entities"
}
-->