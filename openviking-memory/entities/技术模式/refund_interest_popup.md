# Popup de cálculo de reembolso de juros

Padrão de refatoração onde o cálculo e a confirmação de juros de reembolso são divididos em etapas independentes com popup dedicado.

## 描述
- Largura do popup «退款利息计算» ajustada para 900px.
- Rótulo «结息时间» alterado para «退款计息时间».
- Chama `calAmountRefund` para exibir tabela (colunas: conta de negócio, localização do imóvel, etc.).
- Depois chama `refundAmountInterest` para salvar.
- Localização do imóvel prioriza `position` ou concatenação.

## Relações
- 涉及文件: `accRefund/components/AccountRefundTable.vue`, `accRefund/components/AccountRefundDialog.vue`, `accountSplit/components/AccountListTable.vue`, `accountSplit/detail.vue`, `receiptin/detail.vue`, `main.js`, `api/index.js`, `utils/request.js` (projeto zhi2-web-admin).
- Cálculo e confirmação divididos em passos independentes.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_interest_popup",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 1,
  "memory_type": "entities"
}
-->