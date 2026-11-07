# zs-table-column未防护row.column.label致报错
zs-table-column.vue 的 getHeader/computedWidth 直接访问 row.column.label，row.column 可能临时 undefined 致报错。

## 问题根因
- getHeader/computedWidth 直接访问 row.column.label
- row.column 可能临时 undefined 致报错

## 解决方案
- 改用 row?.column?.label ?? '' 防护
- 提前返回防护避免 undefined 访问

## 验证与归属
- 验证证据：extracted source=cursor session=4bab2422-f3d5-47d6-ac5c-bc239d948ba1
- 涉及文件：zs-table-column.vue
- 来源会话ID：4bab2422-f3d5-47d6-ac5c-bc239d948ba1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_column_label",
  "source_extraction_id": "a3bfbac947954a81ad8f12ef85714da5",
  "version": 1,
  "memory_type": "entities"
}
-->