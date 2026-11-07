# ShareholderPlainTable 列宽自适应清理
苏州市房地产监测V3 的 ShareholderPlainTable.vue 移除 10 列 zs-table-column 的 width/min-width，改由组件自动测算列宽。

## 修改内容
- 移除 ShareholderPlainTable.vue 中 10 列 zs-table-column 的 width 与 min-width 属性
- 列宽交 zs-table-column 组件内部自动测算，不再写死
- 序号列沿用 FIXED_TYPE_WIDTH.index 固定 80px 宽，不参与自适应

## 涉及文件
- src/views/company/companyManagement/components/ShareholderPlainTable.vue
- src/components/zs-table-column/zs-table-column.vue
- e2e/list/table-column-width.spec.js
- src/views/system/dept/index.vue

## 验证与归属
- 验证证据：extracted source=cursor session=abe2444f-3dfc-4ad1-adff-0f6f6120cb0c
- 所属项目：苏州市房地产监测V3（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "shareholder_plain_width",
  "source_extraction_id": "e48180d462ec477a8cff68759c2854c7",
  "version": 1,
  "memory_type": "entities"
}
-->