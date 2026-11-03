# zs-table树表块级div致箭头换行
zs-table-column 使用块级 div.zs-table-column-cell 包裹内容，导致树形表展开箭头换行至文字上方，已通过样式调整为同行。

## 问题根因
- zs-table-column 使用块级 div.zs-table-column-cell 包裹单元格内容
- 树形表展开箭头因块级布局换行至文字上方

## 修复方案
- zs-table.vue 增加样式将该 cell 设为 inline-block 以与箭头同行
- menu/index.vue 省略样式移至内部 span

## 验证与归属
- 验证证据：src=cursor session=6b32dd33-be60-425a-a23a-be6d3b205f14
- 涉及文件：system/menu/index.vue、styles/index.scss、components/zs-table-column/zs-table-column.vue、components/zs-table/zs-table.vue、system/dept/index.vue
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_arrow",
  "source_extraction_id": "b35c8cec348f4300ac901e68405922f1",
  "version": 1,
  "memory_type": "entities"
}
-->