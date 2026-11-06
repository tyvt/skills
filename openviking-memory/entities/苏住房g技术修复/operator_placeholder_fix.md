# 高级查询操作符下拉框占位符与自动选中修复（苏住房G）
苏住房G 项目调整公共查询高级筛选组件 `zs-advanced-query` 中操作符下拉框的占位符显示与自动选中逻辑。

## 问题原因
- 原操作符下拉框在选中字段后立刻填入第一个操作符，导致占位符不出现，多操作符字段用户易漏选

## 修复内容
- 占位符按启用/禁用区分：已选查询字段显示「请选择」，未选禁用字段不显示占位符
- 仅「固定操作符」字段（仅 1 个可选操作符）在选字段后自动选中操作符
- 多操作符字段保留「请选择」，由用户手动选择

## 涉及文件与归属
- 涉及文件：`zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue`
- 所属项目：苏住房G；来源会话：429acee0-eca5-4450-8610-60939deb48d6；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "operator_placeholder_fix",
  "source_extraction_id": "07c5dd5811794d2c87b3f9503f43828e",
  "version": 1,
  "memory_type": "entities"
}
-->