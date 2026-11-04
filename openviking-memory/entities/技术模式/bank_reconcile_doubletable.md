# 银行对账中的表单样式与双表
针对业务对账中字段顺序错误和对话框样式的技术标准。
## 问题根因
- 搜索表单的字段顺序不符合设计。
- 责任银行非只读，按钮文本错误。
- 提示框样式不统一，双表未并排。
## 解决方案
- 调整字段顺序，添加 placeholder，责任银行 readonly。
- 按钮文本右对齐，提示框带左侧和垂直方向8px橙色边框，双表并排且样式统一。
## 文件与验证
- 涉及文件: BankReconciliation.vue, pubBankDetailDay/index.vue, bankDetailDay/index.vue, ListOperationButtonContainer/index.vue, SearchFormItem.vue, pubBankReceiptApply/detail.vue.
- 源会话: a42d5cdd-87c9-4207-ab15-4eaa0e897ab6; 基线: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_reconcile_doubletable",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->