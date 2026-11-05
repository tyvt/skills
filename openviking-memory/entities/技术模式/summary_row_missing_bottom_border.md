# 小计行缺失下边框线修复
园区物管2.0 带小计的列表页表格底部边框缺失，已修复并对所有带小计列表页生效。

## 问题根因
- 列表页 .list-card 表格只设上/左/右边框，无下边框
- 有分页时不加 zs-table-container--bottom-spacing，不自动补下边框
- 小计行在 el-table__footer-wrapper 内，底部边框易被 overflow:hidden 裁切

## 修改内容
- zs-table.vue：启用合计行时增加 zs-table-container--with-summary 类名
- index.scss：对有合计行的表格补 border-bottom: 1px solid #f0f0f0
- resourcesLeaseContractFiling/index.vue：绑定 :border="border"，设 bottom-summary-variant="table" 使合计区与表格边框衔接

## 验证与归属
- 涉及文件：zs-table.vue、index.scss、resourcesLeaseContractFiling/index.vue、ZsSummaryText/index.vue
- 所属项目：园区物管2.0；来源会话：9a3daf50-8a49-4516-af4c-070c6201cf9b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "summary_row_missing_bottom_border",
  "source_extraction_id": "d4c167325849479e80ae46b9e66aeb77",
  "version": 1,
  "memory_type": "entities"
}
-->