# 银行回单模式验证阻止了已对账查询
在 Park Public Benefit (zhi2-web-admin) 项目中，pubBankDetailDay/index.vue 中的 validateBankReceiptQueryParams 和 shouldUseBankReceiptMode 函数错误地将对账状态限制为“未对账”，阻止了已对账回单的查询。

## 问题根因
- validateBankReceiptQueryParams 和 shouldUseBankReceiptMode 强制状态为未对账
- 已对账数据因不满足该条件被阻止，导致无法查询

## 解决方案
- 移除了未对账的验证，仅保留手动核销条件
- 支持显示已对账和未对账的银行回单

## 涉及文件
- src/views/benefit/pubBankDetailDay/index.vue
- src/views/benefit/components/BankReconciliation.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：859f5de6-bf9f-4503-94b7-53f26a6002a5
- 所属项目: Park Public Benefit; 会话: 859f5de6-bf9f-4503-94b7-53f26a6002a5; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_query_block",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->