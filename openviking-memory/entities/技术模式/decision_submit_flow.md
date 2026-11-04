# Decision Submit Flow
Sequência de chamadas de API ao enviar formulários de decisão/eleição de proprietários.

## Fluxo de chamadas
- StepSign.vue chama primeiro POST /file/file/upload para enviar assinatura e armazena em voteStore.signUrl
- submit() chama GET /autonomy/AppDecision/listDecisionRangeId para obter o ID de intervalo
- Por fim chama POST /autonomy/decisionResponse para submeter a decisão

## Arquivos envolvidos
- src/pages_owner/poll/index.vue, src/pages_owner/decision/form.vue, src/pages_owner/elect/form.vue
- src/pages_owner/decision/components/StepSign.vue, src/api/autonomy.js
- src/pages/components/SignBoard.vue, src/api/file.js

## Origem
- Sessão de origem: b84da848-f75a-4ee3-8fc5-7e4346f247b5
- 所属项目: zhi2-mobile-shimin (C端 do Suzhou Housing)

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_submit_flow",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "entities"
}
-->