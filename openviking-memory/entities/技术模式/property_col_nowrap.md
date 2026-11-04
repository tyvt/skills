# publicPortal 商品房表格房屋用途列
门户 publicPortal 商品房表格「房屋用途」列因过窄导致表头换行，需加宽并设 nowrap。

## 解决方案
- 列宽从约 96px 提到约 120px（按实际文案微调）
- 该列表头与单元格设置 white-space: nowrap 保证「房屋用途」单行
- 序号列可单独收窄，其它列尽量避免 ellipsis 除非设计明确要求
- 表头带单位等标注需与 mock/接口字段同步改列 title

## 验证与归属
- 验证证据：房屋用途列宽 96px→120px 并设不换行；同会话另有表头加单位、序号列变窄等
- 涉及文件：src/views/home/publicPortal/components/PortalTable.vue、publicPortal/pages/PropertyPages.vue、publicPortal/portal.scss
- 所属项目：门户；来源会话：73eddf52-d142-466d-8d9c-fda167da60fd；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_col_nowrap",
  "source_extraction_id": "7540a34f05f848419ec0e5ae05fd41db",
  "version": 1,
  "memory_type": "entities"
}
-->