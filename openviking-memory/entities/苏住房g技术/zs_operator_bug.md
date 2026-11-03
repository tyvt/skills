# zs高级查询多操作符自动选中致占位缺失
`zs-advanced-query.vue` 多操作符字段自动填入首个操作符导致占位符不显示的 bug。

## 问题根因
- `zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue` 多操作符字段自动填入首个操作符
- 导致占位符不显示，未选禁用字段不显示占位符

## 修复方案
- 仅固定操作符字段自动选中，多操作符保留「请选择」手动选择
- 未选禁用字段不显示占位符

## 验证与归属
- 验证证据：src=苏住房G/093.md
- 涉及文件：zs-advanced-query.vue、complex/index.vue、zs-select.vue、SingleSelect.vue、complexFieldConfig.js
- 所属项目：苏住房G；来源会话ID：429acee0-eca5-4450-8610-60939deb48d6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "zs_operator_bug",
  "source_extraction_id": "482c499e25834a43ae52011f7d73c444",
  "version": 1,
  "memory_type": "entities"
}
-->