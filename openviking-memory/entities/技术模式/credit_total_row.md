# 信用报告列表合计行对齐修复
园区物管2.0 修复信用报告列表合计行因全局 padding 导致的宽度不一致问题。

## 问题原因
- 全局样式 `.list-container .zs-table-container` 给表格容器加左右各 12px padding
- 合计行位于 `table-section` 下、不在 `zs-table-container` 内，导致合计行比表格宽约 24px

## 解决方案
- 在 `.table-section` 内将 `zs-table-container` 的 padding 重置为 0
- 使表格与合计行左右对齐、宽度一致

## 涉及信息
- 涉及文件：src/views/credit/companyEvaluation/components/index.vue、detail.vue、src/views/evaluation/companyReport/components/index.vue
- 所属项目：园区物管2.0；来源会话：00d40a53-3f14-4723-afac-4ee9a24737e8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credit_total_row",
  "source_extraction_id": "9b2ff210e04c406b95120c0b33048de0",
  "version": 1,
  "memory_type": "entities"
}
-->