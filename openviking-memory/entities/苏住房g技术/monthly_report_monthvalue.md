# 月报合计列未解包monthValue致显对象
月报统计合计列因未解包monthValue而渲染对象而非数字，已通过新增辅助函数修复。

## 问题根因
- src/utils/monthlyReport.js的buildStatTableRows中regionValues与total直接取嵌套对象未解包monthValue
- 导致合计列渲染{"monthValue":3}而非数字3

## 解决方案
- 新增extractMonthValue辅助函数返回item?.monthValue ?? null
- 对regionValues映射及total统一解包为数字

## 验证与归属
- 验证证据：苏住房G/085.md
- 涉及文件：src/views/publicQuery/monthlyReport/detail.vue、src/views/publicQuery/monthlyReport/components/ReportItemsTable.vue、src/utils/monthlyReport.js、src/views/publicQuery/monthlyReportStat/detail.vue
- 所属项目：苏住房G；来源会话ID：697d27f0-7752-400c-9d86-9e7940bec722；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "monthly_report_monthvalue",
  "source_extraction_id": "1af7b39407a248248e8b533ea8f422ce",
  "version": 1,
  "memory_type": "entities"
}
-->