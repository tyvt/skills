# 泰兴小程序 echarts 裁剪包缺失 line 系列
工单趋势图空白的真正原因是图表库定制裁剪包缺了 line 系列，而非业务代码。

## 问题根因
- 项目三处 echarts.min.js（staff、pages_benefit、pages_owner/decision）是同一份 624KB 定制裁剪包，2026-09-10 18:45 被同时替换，基于 echarts 5.2.1
- grep 注册标记发现 `series.bar`/`series.pie`/`series.gauge` 均在，唯独 `series.line` 完全不存在
- `type:'line'` 被 echarts 静默跳过（零报错），导致折线不画、legend 无系列、yAxis 无数据范围，全部级联空白
- 柱状图/饼图/仪表盘一直正常，实验中柱状图在同一画布完整画出印证此点

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序
- 涉及文件：src/staff/pages/components/echarts-uniapp/echarts.min.js、src/pages/staff/statistics/index.vue、src/staff/pages/components/echarts-uniapp/echarts-uniapp.vue、src/staff/api/statistics.js
- 来源会话ID：d49c732e-8ba3-4835-a555-2cc946440322

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "taixing_echarts_line_missing",
  "source_extraction_id": "31154dd57d29449692bc02b09f1c6aad",
  "version": 1,
  "memory_type": "entities"
}
-->