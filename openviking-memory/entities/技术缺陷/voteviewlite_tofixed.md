# VoteViewLite sem toFixed gera casas decimais excessivas
A propriedade computada de proporção em VoteViewLite.vue retornava float direto e a diretiva v-money:2 não formatava atualizações assíncronas.

## 问题根因
- A propriedade computada de proporção em VoteViewLite.vue retornava resultado de ponto flutuante direto
- A diretiva v-money:2 não formata valores de atualização assíncrona, gerando muitas casas decimais

## Correção
- Usar toFixed(2) na propriedade computada para manter duas casas decimais
- Comportamento alinhado a VoteView.vue

## 验证与归属
- 验证证据: extracted source=cursor session=b1f6d756-0df5-4c21-989e-f70ed877907d
- 涉及文件: optionDecision/components/VoteView.vue, optionDecision/components/VotingItemsTable.vue, optionDecision/detail.vue, ownerDecision/components/VoteView.vue, optionDecision/components/MaintainResultDialog.vue, decisionCommon/components/VoteViewLite.vue, directives/money.js, formatters/index.js
- 所属项目: 太仓G; sessão: b1f6d756-0df5-4c21-989e-f70ed877907d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Bug técnico",
  "name": "voteviewlite_tofixed",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->