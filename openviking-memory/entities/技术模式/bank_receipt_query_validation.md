# 银行回单校验误拦普通已对账查询
园区公共收益项目(zhi2-web-admin)中，getList() 的回单模式校验误拦普通已对账查询，需拆分校验条件并限定回单模式。

## 问题根因
- getList() 中 isBankReceiptMode 校验强制「手工核销+未对账」
- 普通已对账查询因不满足该条件被错误拦截

## 解决方案
- 普通查询仅校验管理账户和记账日期
- 新增 shouldUseBankReceiptMode 计算属性限定回单模式
- 条件不符时自动退出回单模式

## 涉及文件
- src/views/benefit/pubBankDetailDay/index.vue
- src/views/benefit/components/BankReconciliation.vue
- src/api/benefit/pubBankDetailDay.js

## 验证与归属
- 所属项目：园区公共收益；来源会话：5f77e518-5da0-4307-9f26-9c451500d423；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_query_validation",
  "source_extraction_id": "cfd7b23fcef747ecbde4acd045c019b6",
  "version": 1,
  "memory_type": "entities"
}
-->