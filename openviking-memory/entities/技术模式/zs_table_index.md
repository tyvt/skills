# zs-table-column 单元格覆盖 index
`zs-table-column` 固定渲染 `scope.$index + 1` 且自定义单元格盖掉默认展示，致父组件 `:index` 回调失效，由 `formatRowIndex` 统一处理序号。

## 问题根因
- `zs-table-column` 固定渲染 `scope.$index + 1` 且自定义单元格盖掉默认展示，致父组件 `:index` 回调失效

## 解决方案
- `formatRowIndex` 统一处理序号：有回调用回调，无则每页从 1 递增
- 未传 `:index` 的列表行为不变

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/002.md
- 涉及文件：src/views/company/shareholder/index.vue、src/mixins/listMixins.js、src/mixins/table.js、src/views/company/companyAdmin/index.vue、src/components/zs-table-column/zs-table-column.vue、src/components/zs-table/zs-table.vue、src/views/company/personnelCertificate/index.vue
- 来源会话ID：e387fb5f-000b-40ca-88e6-acb880980ed7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_index",
  "source_extraction_id": "f69f45146b4e40659a242782010bccec",
  "version": 1,
  "memory_type": "entities"
}
-->