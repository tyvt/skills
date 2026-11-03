- Em completion/detail.vue o valor do orçamento de reparação vincula maintainFeeAmountY e adiciona o campo obrigatório constructionSettleAmount; ao trocar o projeto de reparação sincroniza para evitar resíduo.
- Em final/index.vue, quando settleWarnFlag===true o valor fica vermelho com ícone de aviso e tooltip a partir de settleWarnMsg; o aviso de liquidação deve depender apenas de campos do backend, nunca de cálculo no frontend.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Aviso de liquidação de projeto",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "preferences"
}
-->