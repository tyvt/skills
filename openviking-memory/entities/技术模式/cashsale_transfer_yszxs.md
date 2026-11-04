# Cashsale Transfer yszxs Code
现售转移通过代码 `yszxs` 拼接预销售和订单自身的附件。

## 描述
- `cashsaleConstants.js` 添加了 `TRANSFER_APPENDIX_BUS_CODE = 'yszxs'`.
- `resolveAppendixBusCode` 返回该代码以映射附件列表。

## 解决方案
- `CashsaleTransferAppendixPanel.vue` 拉取预销售的 `ysxksq` 附件作为只读。
- 通过 `AnnexUpload` 拼接当前订单的 `yszxs` 附件。

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/070.md
- 涉及文件: presale/cashsale/components/CashsaleDetail.vue, permit/components/PermitAppendixPanel.vue, components/AnnexUpload/index.vue, e2e/presale/cashsale-transfer-real-api-flow.spec.js, e2e/fixtures/cashsale-transfer-helpers.js, presale/permit/components/detail.vue, permitConstants.js, cashsaleConstants.js
- 所属项目: 苏州市房地产监测V3; 会话: b682e5d0-7ff0-4125-961e-04c9a7ebb147; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_transfer_yszxs",
  "source_extraction_id": "871325fa12334107afbf4d507d0400dd",
  "version": 1,
  "memory_type": "entities"
}
-->