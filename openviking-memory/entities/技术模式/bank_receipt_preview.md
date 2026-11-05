# bank_receipt_preview
产品2.0 的银行回单模块 (`BankReceiptDetailDialog.vue` 等) 调整查看态与编辑态的凭证预览展示。

## 查看态调整
- `BankReceiptDetailDialog.vue` 中当 `simplifiedLayout && dialogFormMode === 'view'` 时不再渲染 `BankReceiptForm`，改用 `<DetailTemplate :data="publicReceiptDetailItems" />`。
- `publicReceiptDetailItems` 与表单字段一一对应（行号、交易时间、监管账号等 17 项），末项为 `凭证预览`（`type: 'image'`，`value` 用 `voucherFileUrl`，无则回退 `voucherFileId`）。

## 编辑/新增态调整
- `BankReceiptFormContent.vue` 的 simplified 区块末尾增加整行：标签「凭证预览」的 `el-form-item` 内嵌 `ImageUpload`，`v-model="form.voucherF..."`（原文截断）。

## 涉及文件与来源
- 文件：`BankReceiptDetailDialog.vue`、`BankReceiptFormContent.vue`、`BankReceiptForm.vue`、`pubBankReceiptApply/detail.vue`、`index.vue`、`HeadTitle/index.vue`
- 来源会话：c26c8f38-d604-41d2-b12e-edbdfd3c8e06；项目：产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_preview",
  "source_extraction_id": "cdd213eb2a634e3fb3eece7b8099cf7a",
  "version": 1,
  "memory_type": "entities"
}
-->