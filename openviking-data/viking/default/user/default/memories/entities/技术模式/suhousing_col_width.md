# zs-table-column 列宽修复（苏住房G）
苏住房G 项目中 zs-table-column 去除固定宽度改自适应的修复记录。

## 问题根因
- zs-table-column 会根据内容自动计算列宽，但列上写了 width 就走固定宽度逻辑，不再参与自适应
- SelectRecordProcedureDialog 的「巡检程序编号」列写死 width="160"，导致长编号被截断显示省略号

## 修复方案
- 去掉该列 width="160"，改由 zs-table-column 根据 procedureCode 内容自动计算 min-width
- 已同步到 develop/v2.6.1、develop/v2.6.2、develop/v2.6.2-yulin 分支
- 刷新后编号列按内容撑开显示

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、views/dataProperty/recordProcess/components/SelectRecordProcedureDialog.vue
- 所属项目：苏住房G；来源会话：db287272-e3da-43d4-8c77-915cb66320da

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suhousing_col_width",
  "source_extraction_id": "65c1d962f20549ccb0401f3b58973a8c",
  "version": 1,
  "memory_type": "entities"
}
-->