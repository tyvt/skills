# 门户 PortalTable 分页与导出序号分工
PortalTable 的分页序号列与 CSV 导出序号采用不同计算方式，保证翻页连续且导出全表下标独立。

## 分页序号规范
- 表格「序号」列在分页场景使用 (page-1)*pageSize + index + 1 类公式
- 组件内对 sequence/index 计算 value，通过 #cell-sequence 展示该 value，保证翻页连续

## CSV 导出序号规范
- 导出 CSV 时序号使用全表下标 i+1
- 与当前页展示公式分离，互不干扰

## 数字格式化与注意点
- PropertyPages 的数字格式化走 formatPortalNumber/formatArea/formatUnitPrice 等纯方法
- 需注意部分列（如楼幢 area）是否漏接 formatter

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PortalTable.vue、zhi2-web-admin/src/views/home/publicPortal/pages/PropertyPages.vue
- 验证证据：会话 1b6c0e21 确认分页公式与 CSV i+1 分工合理
- 来源会话ID：1b6c0e21-3b26-4630-b1c7-653bd08a5eb8；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_table_sequence",
  "source_extraction_id": "92fb35a05ce345e5af2bec025380f502",
  "version": 2,
  "memory_type": "entities"
}
-->