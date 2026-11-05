# zs-table-column 金额列对齐规则
`zs-table-column` 组件对金额类列的对齐行为，以及倡议管理列表的统一左对齐配置。

## 问题描述
- 原问题：使用 `amountFormatter` 的列会被 `zs-table-column` 自动设为右对齐，覆盖列配置里的 `align: 'left'`
- 占比列仍保留两位小数（如 `5` 显示为 `5.00`）

## 修复规则
- 金额类列仅在未显式设置 `align` / `headerAlign` 时才默认右对齐
- 若列配置显式写了左对齐（`align: 'left'`），按配置生效，不再被强制右对齐
- 倡议管理列表所有列统一设置 `align: 'left'` 和 `headerAlign: 'left'`，表头与单元格均为左对齐

## 涉及文件与归属
- 涉及文件：`src/components/detail-template/detail-template.vue`、`src/views/autonomy/multiply/components/DecisionDetailDialog.vue`、`src/views/autonomy/suggest/detail.vue` 等
- 所属项目：产品2.0；来源会话：378359c0-4d34-425d-b45d-2717c2d30bbf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_align",
  "source_extraction_id": "5d6b812cd45d4d66a1c26b64dc3a53e5",
  "version": 1,
  "memory_type": "entities"
}
-->