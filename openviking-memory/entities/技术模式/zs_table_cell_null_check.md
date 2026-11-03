# zs-table单元格事件cell未判空致报错
园区公共收益项目中 `zs-table.vue` 的 `handleCellMouseEnter` 与 `handleCellMouseLeave` 未对 Element UI 传入的 `cell` 判空，在合计行等场景 `cell` 为 `undefined` 时访问 `cell.parentElement` 触发报错。

## 问题根因
- `handleCellMouseEnter` 与 `handleCellMouseLeave` 直接访问 `cell.parentElement`
- 合计行等场景 Element UI 传入的 `cell` 为 `undefined` 导致读取属性报错

## 解决方案
- 两方法内增加空值判断，仅 `cell?.parentElement` 存在时才添加或移除 `hover-row` 类

## 验证与归属
- 验证证据：src=园区公共收益/040.md
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、src/views/building/house/index.vue、src/components/zs-table-column/zs-table-column.vue、src/mixins/listMixins.js、src/mixins/table.js、package.json
- 所属项目：园区公共收益；来源会话：65ff3dc2-6a51-41e1-8dfa-f8e3a9d71203；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_cell_null_check",
  "source_extraction_id": "381659ee9de44443be66fc4b57c43a44",
  "version": 1,
  "memory_type": "entities"
}
-->