# 已对账收据行错误地显示了核销按钮
在 Park Public Benefit (zhi2-web-admin) 项目中，pubBankDetailDay/index.vue 中的 bankReceiptOperateButtons 函数未检查对账状态，且总是显示核销按钮。

## 问题根因
- bankReceiptOperateButtons 未根据对账状态进行区分，在对账行中也显示了核销按钮
- 缺少针对已对账状态的保护

## 解决方案
- 新函数 isBankReceiptReconciled(row) 根据条件显示查看/核销/无按钮
- handleReceiptWriteOff 增加了对已对账状态的保护

## 涉及的文件
- src/views/benefit/pubBankDetailDay/index.vue
- src/views/benefit/components/BankReconciliation.vue
- src/views/maintenance/maintenanceRec/index.vue
- src/components/zs-operate-column/zs-operate-column.vue
- src/api/benefit/pubBankReceiptDetail.js
- src/views/benefit/bankDetailDay/index.vue
- src/views/benefit/components/BankReceiptForm.vue
- src/views/benefit/pubCheckoutManage/index.vue

## 验证与归属
- 所属项目: Park Public Benefit; 会话: 6a315793-11fc-4e4d-9c27-2ea581a2e486; base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_writeoff_btn",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->