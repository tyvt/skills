# 核销金额列须弃旧字段取新字段
园区物管2.0 核销金额列统一使用新字段 `hasVerifiedAmount`，不再兼容旧字段。

## 问题描述
- 合同/通知书选择弹窗核销金额列原兼容 `verifiedAmount`/`writeOffAmount` 旧字段，易取错值

## 解决方案
- `contractSelectColumns` 与 `noticeSelectColumns` 核销金额列 `prop` 改为 `hasVerifiedAmount` 并经 `amountFormatter` 格式化
- `pickVerifiedAmount` 仅取 `row.hasVerifiedAmount`，移除旧字段兜底
- 依赖接口返回 `hasVerifiedAmount` 字段

## 验证与归属
- 涉及文件：src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailDialog.vue、src/views/benefit/pubVerificationReceipts/index.vue、src/views/benefit/pubManualBookkeeping/components/bookDetailDialog.vue、src/components/zs-table-column/zs-table-column.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：5e7474f2-650a-42f0-8f20-80148c8c43d8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "verified_amount_field",
  "source_extraction_id": "e008fb7437824de69119ff4118b6d71b",
  "version": 1,
  "memory_type": "entities"
}
-->