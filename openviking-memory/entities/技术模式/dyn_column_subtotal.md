# 动态列致zs-table小计合计行错位
动态v-if列导致zs-table的fit切换与columnOrderKey变化时合计行footer未同步重排，致费用分摊小计错位。

## 问题根因
- 动态v-if列触发zs-table的fit切换与columnOrderKey变化
- 合计行footer未同步重排，费用分摊小计错位

## 解决方案
- zs-table.vue的refreshColumnOrderKey()于开启合计行时双$nextTick调用resyncTableLayout()
- 新增watch: flexColumnCount及refreshSummaryColumns()触发重排
- 修正final/components/feeShareTable.vue与budget/components/feeShareTable.vue

## 验证与归属
- 验证：src=园区公共收益/024.md
- 涉及文件：components/zs-table/zs-table.vue、maintenance/final/components/feeShareTable.vue、maintenance/budget/components/feeShareTable.vue、maintenance/components/ShareTable.vue、components/zs-operate-column/zs-operate-column.vue、components/zs-table-column/zs-table-column.vue
- 所属项目：园区公共收益；来源会话：3936cf21-6925-44f4-a5c6-987975681a38；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dyn_column_subtotal",
  "source_extraction_id": "a6b960fcc3174e9ebd9dd580bc8cae17",
  "version": 1,
  "memory_type": "entities"
}
-->