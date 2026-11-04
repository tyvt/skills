# 缴存支用明细业务编号未配置跳转
`AccountDetailTable.vue` 缴存/支用明细「业务申请编号」原为 `type:'text'` 无跳转，需改为 `type:'link'` 触发 `handleView` 按方向跳转。

## 问题根因
- `guaranteeDepositAccount/components/AccountDetailTable.vue` 缴存/支用明细「业务申请编号」原为 `type: 'text'` 无跳转

## 解决方案
- 改为 `type: 'link'` 触发 `handleView`
- 按借贷方向跳资金缴存/支用详情
- 字段映射兼容 `mSourceCode`、`mSouseCode`、`noticeNo`

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAccount/components/AccountDetailTable.vue、detail.vue、accountQuery/detail.vue、invoiceDetails/components/invoiceDetailsTable.vue、depositNotice/components/index.vue、settlementAccount/detail.vue、guaranteeDeposit/deposit/index.vue、expenditure/index.vue
- 所属项目：产品2.0；来源会话：45dc597d-a46d-45bb-99df-b9e6a99ec8b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_no_jump",
  "source_extraction_id": "61bcf916e961454588f66fa839204bbe",
  "version": 1,
  "memory_type": "entities"
}
-->