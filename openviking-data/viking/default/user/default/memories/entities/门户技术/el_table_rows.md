# el-table 固定列行数翻倍
门户首页待办等使用 el-table 固定列时，DOM 会复制固定列对应行节点，导致 e2e 行数计数翻倍。

## 问题说明
- 用 document.querySelectorAll('.el-table__row') 计数会得到约 2× 实际数据行数。

## 断言建议
- 编写 Playwright 断言行数、斑马纹或可见行时，应按业务行数断言（mock 数据条数、tbody 主表行、或 data 属性），不要直接数全局 .el-table__row。

## 涉及文件与归属
- 涉及：HomeTodoTable.vue、tests/e2e/portal-home-visual.spec.ts
- 所属项目：门户；代码基线：a1e5beb；来源会话ID：ca2d1b01-7b20-4144-be0e-885935ebf70b

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "el_table_rows",
  "source_extraction_id": "ce4e2c50b9cb44edafa7d13db96fe90c",
  "version": 1,
  "memory_type": "entities"
}
-->