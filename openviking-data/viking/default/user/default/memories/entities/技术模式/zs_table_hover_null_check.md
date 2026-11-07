# zs-table 悬停时的空值检查
在 zs-table.vue 中，悬停处理程序在没有检查的情况下访问了 cell.parentElement，当 cell 为 undefined 时导致错误。

## 问题
- 在 zs-table.vue 中，handleCellMouseEnter/handleCellMouseLeave 直接访问了 cell.parentElement。
- 在合计行或未同步的固定列中，cell 可能为 undefined，产生 "Cannot read properties of undefined"。

## 解决方案
- 添加了 `if (!cell?.parentElement) return` 以阻止对 undefined 的访问。

## 文件和来源
- 涉及文件: zs-table.vue; src/views/benefit/assetLeaseApply/index.vue; src/views/property/complex/components/RegionTreeLayout.vue.
- 验证证据: src=产品2.0/085.md; 会话: 2e92212a-8c81-44e4-9cc6-e2feecfe6e5e.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：2e92212a-8c81-44e4-9cc6-e2feecfe6e5e


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_hover_null_check",
  "source_extraction_id": "101ea3de48ee43dbb0f0a7c8a375f9f1",
  "version": 1,
  "memory_type": "entities"
}
-->
