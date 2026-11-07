# zs-table-column.vue 表头渲染未防护 row.column 致 label 报错
公共组件 zs-table-column.vue 在 getHeader/computedWidth 中直接读取 row.column.label，在部分渲染时机 row.column 为 undefined 时抛错。

## 问题根因
- businessItemTable.vue 堆栈报 `Cannot read properties of undefined (reading 'label')`，真正出错在公共组件 zs-table-column.vue 表头渲染逻辑
- getHeader / computedWidth 中直接用了 `row.column.label`，在部分渲染时机或 Element 表头 slot 的 scope 下 `row.column` 可能暂时为 undefined

## 解决方案
- getHeader 改为 `row?.column?.label ?? ''`，避免 column 缺失时抛错
- computedWidth 先取 `const label = row?.column?.label`，无 label 则直接 return，再按原逻辑算 minWidth/width
- 该防护对所有使用 zs-table-column 的列表生效，不仅限于 businessItemTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=bugfix
- 来源会话：4bab2422-f3d5-47d6-ac5c-bc239d948ba1
- 验证证据：src=bugfix；会话：4bab2422-f3d5-47d6-ac5c-bc239d948ba1；涉及文件：businessItemTable.vue、zs-table-column.vue、vue.js
- 所属项目：bugfix；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zscolumn_null_guard",
  "source_extraction_id": "8c338360553b4596af2801645e408eea",
  "version": 1,
  "memory_type": "entities"
}
-->