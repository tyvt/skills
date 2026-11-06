# 项目结算费用分摊小计错位修复
园区公共收益项目结算费用分摊表格小计错位问题已修复，涉及 zs-table 布局重同步与费用分摊表格修正。

## zs-table 主修复（zhi2-web-admin/src/components/zs-table/zs-table.vue）
- refreshColumnOrderKey()：columnOrderKey 变化且开启合计行时，双 $nextTick 调用 resyncTableLayout()，确保 remount 后 footer 同步。
- 新增 watch: flexColumnCount：动态 v-if 列导致 fit 切换时触发重排。
- refreshSummaryColumns()：列集合变化时触发 resyncTableLayout()。

## 费用分摊表格修正
- zhi2-web-admin/src/views/maintenance/final/components/feeShareTable.vue
- zhi2-web-admin/src/views/maintenance/budget/components/feeShareTable.vue

## 涉及文件与来源
- 文件：zs-table.vue、final/components/feeShareTable.vue、budget/components/feeShareTable.vue
- 所属项目：园区公共收益；来源会话：3936cf21-6925-44f4-a5c6-987975681a38；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_share_fix",
  "source_extraction_id": "8cb7befab8654af79a9acdf99f050a39",
  "version": 1,
  "memory_type": "entities"
}
-->