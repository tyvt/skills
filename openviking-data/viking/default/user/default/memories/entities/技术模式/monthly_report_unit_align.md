# 月报统计单位列对齐
苏住房G 项目月报统计详情页单位展示已与月报对齐，移除独立单位列。

## 改动说明
- `monthlyReport.js` 的 `buildStatTableRows` 改用默认 `buildHierarchyCells(paths)`，单位合并进叶子节点名称（如 `有编制(名)`）
- 移除返回对象中仅用于独立列的 `unitName` 字段
- `buildStatColumnWidths` 删除 `unit` 列宽计算，`tableWidth` 不再含单位列
- `monthlyReportStat/detail.vue` 删除 colgroup 单位列、表头「单位」列、tbody 中 `row.unitName` 单元格及 `.unit-col` 样式

## 验证结果
- 本地脚本验证统计页与月报页叶子节点名称一致（均为 `有编制(名)`）
- `columnWidths` 中已无 `unit` 字段，lint 无报错

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/utils/monthlyReport.js`、`zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue`
- 所属项目：苏住房G；来源会话：c17a549c-5505-45c7-a569-8186d32c2167；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_unit_align",
  "source_extraction_id": "0fa9adadc9e847248fa4eb9235709be9",
  "version": 1,
  "memory_type": "entities"
}
-->
