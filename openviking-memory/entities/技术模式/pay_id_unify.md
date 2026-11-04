# Unificar ID de pedido na cadeia de pagamento
Toda a cadeia de pagamento deve usar o ID de pedido retornado por `createFromBill` para requisitar o QR code via `POST /property/spOrder/payInfo`, exibir no diálogo e fazer polling de `queryOrderStatus`, substituindo o `orderNo` retornado por `payInfo` para evitar inconsistência de ID.

## Contexto
- A cadeia usava `orderNo` de `payInfo` no polling, gerando inconsistência de ID
- `createFromBill` é a fonte autoritativa do ID de pedido

## 解决方案
- Usar o ID de `createFromBill` em `payInfo`, exibição do diálogo e `queryOrderStatus`
- Substituir `orderNo` retornado por `payInfo`

## 验证与归属
- 涉及文件: spFeeBill/components/collectionDialog.vue, spFeeBill/components/index.vue, bill/components/PaymentDialog.vue, spFeeBill/components/enums.js
- 所属项目: 产品2.0; 来源: 035.md; Sessão: 22489706-6592-40f4-b567-7d65ec1e013f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pay_id_unify",
  "source_extraction_id": "48b19525c64140a5b949b1bdad141457",
  "version": 1,
  "memory_type": "entities"
}
-->