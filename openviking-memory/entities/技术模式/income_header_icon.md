# 入账金额提示图标移至列表表头
园区物管2.0 将入账金额列的提示图标从每行单元格移至表头，消除重复渲染。

## 问题描述
- `incomeAmount` 列原在每行单元格显示 info 图标与悬停说明，重复且占空间

## 解决方案
- 列通过 `slot="header"` 在表头渲染文案与 info 图标悬停说明
- 单元格仅保留数值，不再渲染每行重复提示图标

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailTable.vue、src/components/zs-table-column/zs-table-column.vue、src/views/evaluation/assessment/assessmentSummary/components/QuarterTable.vue、src/views/evaluation/assessment/assessmentSummary/components/SatisfactionTable.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：7627d6c0-682a-4b8c-b64a-18af71eaae7a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "income_header_icon",
  "source_extraction_id": "e008fb7437824de69119ff4118b6d71b",
  "version": 1,
  "memory_type": "entities"
}
-->