# Bloqueio branco e falta de resumo centralizado em pagamentos
Card de padrão técnico para anomalias de UI em pubPaymentNotice e pubManualBookkeeping no projeto zhi2-web-admin.
## 问题根因
- pubPaymentNotice/index.vue não definiu showSummary:true, ocultando subtotal.
- detail.vue com campos não centralizados e DetailTemplate sem labelAlign.
- pubManualBookkeeping/index.vue busca por palavra-chave sem attrs.placeholder causando anomalia de cor.
- Coluna fixa gera bloco branco el-table__fixed-right-patch.
## 解决方案
- Ativar showSummary e definir align/labelAlign centrado, adicionar suporte labelAlign.
- Completar attrs.placeholder; index.scss oculta bloco branco.
## Arquivos e verificação
- 涉及文件: pubPaymentNotice/index.vue, pubManualBookkeeping/index.vue, pubPaymentNotice/detail.vue, pubManualBookkeeping/detail.vue, bookDetailTable.vue, mixins/table.js, pubParkingRate/index.vue, detail-template.vue.
- Sessão de origem: 5ec6511f-7bd3-4005-a984-83b775525513; linha de base: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubpayment_summary_whiteblock",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->