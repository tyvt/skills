# 预售转现售要件拼接方案
苏州市房地产监测V3 实现预售转现售要件拼接，复用预售要件并拼接本单 yszxs 要件。

## 实现摘要
- cashsaleConstants.js：新增 TRANSFER_APPENDIX_BUS_CODE = 'yszxs'；resolveAppendixBusCode 转现售路由返回 yszxs；新增 mapAppendixPackageList 映射附件列表；validateCashsaleAnnexRequired 支持面板 validateRequired() 委托
- CashsaleTransferAppendixPanel.vue：选证后拉取预售要件（ysxksq + presalePermitId）标记为只读；通过 AnnexUpload + handleConfig 拼接 yszxs 本单要件

## 涉及文件
- src/views/presale/cashsale/cashsaleConstants.js
- src/views/presale/cashsale/components/CashsaleTransferAppendixPanel.vue
- src/views/presale/cashsale/components/CashsaleDetail.vue
- e2e/fixtures/cashsale-transfer-helpers.js

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：b682e5d0-7ff0-4125-961e-04c9a7ebb147；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_transfer_appendix_pattern",
  "source_extraction_id": "dfa75a1a33464c4a91b18744ec547ae7",
  "version": 1,
  "memory_type": "entities"
}
-->