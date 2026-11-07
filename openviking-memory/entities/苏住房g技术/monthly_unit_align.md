# 月报统计详情页单位列对齐月报口径
苏住房G 月报统计详情页需与月报一致：单位随叶子节点名称合并显示，不单独成列。

## 问题背景
- 月报统计详情页把「单位」做成独立一列，用户要求与月报一致——单位随叶子节点名称合并显示（如「有编制(名)」），不单独成列

## 修复方案
- 数据层 src/utils/monthlyReport.js：buildStatTableRows 改回默认 buildHierarchyCells(paths)，单位自然并入叶子名；删除只服务独立列的 unitName 字段
- 视图层 monthlyReportStat/detail.vue：同步删 <colgroup> 的单位列、表头「单位」列、tbody 里 row.unitName 单元格、.unit-col 样式
- 列宽同步：buildStatColumnWidths 删掉 unit 列宽计算，tableWidth 不再含单位列，否则整表列宽按多一列分配而漂移、表头与单元格错位

## 验收与边界
- 验收口径：本地脚本比对统计页与月报页叶子节点名称一致、columnWidths 中已无 unit 字段
- 边界必须提前告知用户：页面展示已对齐但「导出」走后端 /property/monthlyReportStat/export，Excel 里若还有独立单位列前端改不动，需后端同步
- 验证：会话 c17a549c-5505-45c7-a569-8186d32c2167（基线 d5eee56）用户要求「月报统计的单位想和月报一样，不需要单独拆一列」
- 涉及文件：zhi2-web-admin/src/utils/monthlyReport.js、zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue、zhi2-web-admin/src/views/publicQuery/monthlyReport/components/ReportItemsTable.vue
- 所属项目：苏住房G

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：c17a549c-5505-45c7-a569-8186d32c2167


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "monthly_unit_align",
  "source_extraction_id": "e1db49533c284582ba9bbe3acf901093",
  "version": 1,
  "memory_type": "entities"
}
-->
