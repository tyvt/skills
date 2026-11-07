# 银行明细日对账回单查看分流
园区公共收益项目中，公共收益银行明细日对账列表「查看」按钮的已对账判定与双跳转路径业务模式。

## 业务规则
- 「查看」用 isBankReceiptReconciled(row) 控制显示，满足任一即视为已对账可查看：查询条件 reconciliationStatus === '2'、行上存在 receiptVerificationId、或行 reconciliationStatus === '2'
- 未对账行只展示「核销」，已对账隐藏「核销」只保留「查看」，两者互斥

## 跳转路径
- 点击后：有 receiptVerificationId 路由到回单核销详情（PubVerificationReceipts）
- 仅有 receiptDetailId 则开 BankReceiptDetailDialog
- 都没有则提示「暂无回单详情」

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue
- zhi2-web-admin/src/views/benefit/components/BankReceiptDetailDialog.vue

## 验证与归属
- 产品要求已对账回单可查看；实现互斥核销/查看及双跳转路径
- 所属项目：园区公共收益；来源会话 8839f2cf-25d9-4d13-b279-55b99bf07d72；代码基线 4468dfa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_view_flow",
  "source_extraction_id": "729462dc60724a439e21f41e80afdde9",
  "version": 1,
  "memory_type": "entities"
}
-->