# 表格滚动条须整表悬停显示
Element 表格的横向滚动条滑块原仅在指针贴近滚动条轨道时显现，需改为整表悬停触发，提升可用性。

## 根因
- 原选择器 `.el-table__body-wrapper:hover::-webkit-scrollbar-thumb` 仅当指针贴近滚动条轨道时生效，悬停表头或单元格不触发滑块。

## 修复方案
- 在 `zhi2-web-admin/src/styles/index.scss` 改用 `.el-table:hover > .el-table__body-wrapper::-webkit-scrollbar-thumb` 与 `.zs-table-container:hover .el-table__body-wrapper::-webkit-scrollbar-thumb`，整表悬停即显示横向滚动条滑块。

## 验证与归属
- 验证证据：src=门户/033.md
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeTodoTable.vue、zhi2-web-admin/package.json、zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/styles/index.scss
- 所属项目：门户；来源会话ID：908fa819-e4da-4511-b737-948d86388270；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_scrollbar_hover",
  "source_extraction_id": "eeb4eae15e2a49d9927fbe95734fea10",
  "version": 1,
  "memory_type": "entities"
}
-->