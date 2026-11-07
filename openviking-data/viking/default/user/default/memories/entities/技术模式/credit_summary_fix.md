# 考评统计底部省略号修复（苏住房G）
苏住房G 信用考评列表底部统计文字被写进表格 footer 各列，列宽不足时触发 text-overflow: ellipsis 且无 tooltip，悬停看不到完整内容，已修复。

## 修复方式
- 文件 `zhi2-web-admin/src/views/credit/assessment/search.vue`
- 移除 summary-method / show-summary，不再把统计塞进各列 footer
- 改用 bottom-summary-items，通过 ZsSummaryText 在表格下方完整展示：物业管理区域考评总数、全部考评、部分考评、未考评
- 展示格式示例：合计：物业管理区域考评总数：**7669**，全部考评：**xxx**，部分考评：**xxx**，未考评：**xxx**
- 与项目其他列表页（日结算、单元列表等）合计展示方式一致，文字不被截断

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：extracted source=cursor project=苏住房G；来源会话ID c8b4a679-e519-431b-abd7-dac21a49201b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credit_summary_fix",
  "source_extraction_id": "b2f3d9a5d671411b9686578f48730eea",
  "version": 1,
  "memory_type": "entities"
}
-->