# DetailTemplate 列计算与独占一行修复
苏州市房地产监测V3 的 DetailTemplate 已完成列 span 计算与独占一行（span 24）逻辑的修复。

## 实现要点
- detail-grid.js 新增 `getDetailSpanSlotUnits`（span 8/16 对应槽位数）与 `assignDetailGridColumn`（与 `rows()` 一致）
- 当前行 `rowSpan + span > 24` 时先换行（`gridSlot` 归零）；`span 24` 时 `colIndex = 0` 且下一项 `nextGridSlot = 0`
- 一行满 24 后同样归零
- detail-template.vue 的 `columnLabelCharCounts`、`labelAreaStyleByDataIndex` 共用 `rowSpan + assignDetailGridColumn`；`getEmptyColumnIndex` 改用 `getDetailSpanSlotUnits`

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/components/detail-template/detail-grid.js、detail-template.vue、company/companyApplyAudit/detail.vue、src/styles/index.scss
- 所属项目：苏州市房地产监测V3；来源会话：63e9efd7-32f6-48eb-a977-6f79ef7ad989；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_column_calc",
  "source_extraction_id": "16a1550171f04a6c8f38bcb58d4c2d6a",
  "version": 1,
  "memory_type": "entities"
}
-->
