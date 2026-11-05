# 保证金账户明细业务编号跳转
产品2.0 房屋质量保证金账户详情页为缴存/支用明细的「业务申请编号」列添加了跳转链接。

## 主要变更
- `AccountDetailTable.vue` 中业务申请编号由 `type:'text'` 改为 `type:'link'`，点击触发 `handleView`
- 按借贷方向跳转：缴存明细（贷）→ 资金缴存详情；支用明细（借）→ 资金支用详情
- 统一编号字段映射，兼容 `mSourceCode`、`mSouseCode`、`noticeNo` 等字段

## 验证与涉及
- 可在账户详情页「缴存明细」「支用明细」两个 Tab 验证跳转是否正常
- 文件：`guaranteeDepositAccount/components/AccountDetailTable.vue`、`maintenance/accountQuery/detail.vue`、`invoiceDetails/components/invoiceDetailsTable.vue`、`depositNotice/components/index.vue`、`settlementAccount/detail.vue`、`guaranteeDeposit/deposit/index.vue`、`expenditure/index.vue`
- 项目：产品2.0；来源会话：45dc597d-a46d-45bb-99df-b9e6a99ec8b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_deposit_link",
  "source_extraction_id": "a0aa551040bb463183a5bf54308c95b5",
  "version": 2,
  "memory_type": "entities"
}
-->