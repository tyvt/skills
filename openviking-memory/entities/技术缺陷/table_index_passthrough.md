# zs-table-column 中 index 的错误传递导致链接点击失效
zs-table-column.vue 的重构将 index/function 泄漏给 el-table-column，并破坏了 type="link"。

## 问题与修正
- 传递给 el-table-column 的 index/function 引起原生属性冲突
- type="link" 在使用 scope.column.type 进行判断时失效
- 非 index 列拦截 index/function 的传递；使用 $attrs.type 进行判断，兼容旧的 :index="handler" 和新的 type="link" :function="handler"

## 验证
- 验证证据: src=苏州市房地产监测V3/062.md
- 涉及文件: BranchOneDialog.vue; YhwdDialog.vue; YhwdTable.vue; zs-table-column.vue; tableColumnConfig.js; pubRegulatoryBranchDialog.vue; zs-select-dialog.vue; zs-select-dialog-func.vue
- 会话: bb86fbc4-fb2e-46ab-8ef7-7ec642005b52; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "table_index_passthrough",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 1,
  "memory_type": "entities"
}
-->
