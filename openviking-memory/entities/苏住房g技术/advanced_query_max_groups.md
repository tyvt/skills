# 高级查询条件组数量上限修复
苏住房G 物业公共查询中 zs-advanced-query 组件因 max-groups 设为 1 导致无法添加第二组条件，调整为 2 后支持默认1个、最多2个条件组。

## 问题现象
- 物业查询条件组 max-groups=1 时仅允许一个条件组，无法添加第二组

## 根因
- zs-advanced-query 的 max-groups 属性被限制为 1，不允许新增条件组

## 解决方案
- 改为 :max-groups="2" 支持默认1个、最多2个条件组
- 组间可切换且/或关系

## 验证与归属
- 验证证据：src=苏住房G/094.md
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue
- 所属项目：苏住房G；来源会话ID：20e31648-4d28-46f2-81a2-de9c591a691a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "advanced_query_max_groups",
  "source_extraction_id": "0b327b19dd11474793140628e1ae49e8",
  "version": 1,
  "memory_type": "entities"
}
-->