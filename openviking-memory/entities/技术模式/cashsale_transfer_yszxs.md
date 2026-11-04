# Cashsale Transfer yszxs Code
A transferência para venda à vista concatena anexos de pré-venda e do próprio pedido via código `yszxs`.

## 描述
- `cashsaleConstants.js` adicionou `TRANSFER_APPENDIX_BUS_CODE = 'yszxs'`.
- `resolveAppendixBusCode` retorna esse código para mapear lista de anexos.

## 解决方案
- `CashsaleTransferAppendixPanel.vue` puxa anexos `ysxksq` de pré-venda como somente leitura.
- Via `AnnexUpload` concatena anexos `yszxs` do pedido atual.

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/070.md
- 涉及文件: presale/cashsale/components/CashsaleDetail.vue, permit/components/PermitAppendixPanel.vue, components/AnnexUpload/index.vue, e2e/presale/cashsale-transfer-real-api-flow.spec.js, e2e/fixtures/cashsale-transfer-helpers.js, presale/permit/components/detail.vue, permitConstants.js, cashsaleConstants.js
- 所属项目: 苏州市房地产监测V3; Sessão: b682e5d0-7ff0-4125-961e-04c9a7ebb147; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_transfer_yszxs",
  "source_extraction_id": "871325fa12334107afbf4d507d0400dd",
  "version": 1,
  "memory_type": "entities"
}
-->