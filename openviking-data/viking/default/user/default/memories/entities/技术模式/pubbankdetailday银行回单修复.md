# 业务对账银行回单逻辑修复
园区公共收益项目 `pubBankDetailDay/index.vue` 业务对账页银行回单查询逻辑修复。

## 问题原因
- 前端把银行回单查询限制为「对账方式=手工核销」且「对账状态=未对账」
- 筛选「已对账」点击「银行回单」提示错误，并在搜索时自动退出回单模式

## 修复方案
- `validateBankReceiptQueryParams`：去掉「未对账」校验，仅保留「手工核销」要求
- `shouldUseBankReceiptMode`：去掉 `reconciliationStatus === '1'` 判断，回单模式下已对账/未对账均展示银行回单数据并调用接口

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue
- zhi2-web-admin/src/views/benefit/components/BankReconciliation.vue

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：859f5de6-bf9f-4503-94b7-53f26a6002a5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubBankDetailDay银行回单修复",
  "source_extraction_id": "a1302e410ccd4dc58b49c441bfc57abd",
  "version": 1,
  "memory_type": "entities"
}
-->