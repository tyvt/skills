# Vue3 表格列插槽语法迁移与 zs-table-column 宽度报错
产品2.0（zhi2-web-admin）迁移 Vue3 时需将旧插槽语法改为新语法，并修复 zs-table-column 因插槽未挂载导致的宽度计算报错。

## 问题根因
- 迁移 Vue3 须把 `slot="header"`/`slot="footer"`/`slot-scope` 等旧写法改为 `#header`、`#default`、`#footer`。
- `zs-table-column` 在插槽未正确挂载时 `computedWidth` 会读 `undefined.column` 抛错（zs-table-column.vue:109）。
- 表格相关组件含 `zs-operate-column`、下拉 `dropdown` 插槽均受影响。

## 解决方案
- 优先批量将旧插槽语法改为新语法后再验证编译。
- 用户要求「插槽新语法全局搜索修复」。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：zs-table-column.vue:109 Cannot read properties of undefined (reading 'column')。
- 验证证据补充：src=2-0/011.md（WdmcDialog.vue 等文件旧插槽语法全局改为 #header/#default/#footer 模板语法）。
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue、WdmcDialog.vue。
- 所属项目：2-0（产品2.0）；来源会话：56daed33-b372-4f48-a73c-1d78207c080e；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_slot_syntax",
  "source_extraction_id": "7032ac70bed64e608e89ffd58925af98",
  "version": 2,
  "memory_type": "entities"
}
-->