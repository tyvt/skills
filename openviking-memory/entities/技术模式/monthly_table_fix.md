# 月报统计表格右侧留白修复（苏住房G）
苏住房G 修复物业管理信息月报统计详情页表格右侧留白问题，改动位于 monthlyReportStat/detail.vue。

## 修复内容
- 表格内联样式：width → minWidth，内容总宽度不足一屏时铺满容器，超出时触发横向滚动
- 样式表：.stat-table 恢复 width: 100%，与同模块其他统计页一致

## 预期效果
- 宽屏：表格铺满内容区，右侧不再留白；第一列由 colgroup 固定约 280px，剩余宽度由合计列和区域列分摊
- 窄屏：内容宽度超容器时，.stat-table-wrap 的 overflow: auto 提供横向滚动

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue
- 所属项目：苏住房G；来源会话：89bf3d7d-179a-4d0a-8a4f-3157bdf4d110

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_table_fix",
  "source_extraction_id": "f2074fcee61d4e23857dd9d56f0de7d1",
  "version": 1,
  "memory_type": "entities"
}
-->