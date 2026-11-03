# Alinhamento do popup de conclusão de votação geral com Kunshan
O popup "manutenção de conclusão de votação geral" alinha-se à lógica de campos da versão unificada de Kunshan.

## Contexto
- A lógica original de campos do popup de manutenção de conclusão de votação geral divergia da versão unificada de Kunshan
- Tipos não eleitorais não devem renderizar a tabela de candidatos e o botão deve ser "确认并推送APP"

## Solução
- Usar o campo ownerCalculationChart para calcular proporções com fallback `|| 0`
- Adicionar "参与权数占比", ajustar dimensão de proporção de aprovação e incluir aviso do código civil
- Não renderizar tabela de candidatos para não eleitorais; botão passa a "确认并推送APP"

## Verificação e origem
- Evidência: extracted source=cursor session=b4e53b8e-164f-4672-9854-192edd804ed5
- Arquivos: decisionCommon/components/MaintainResultDialog.vue, MaintainResultDialogLite.vue, config.js, ownerDecision/components/MaintainResultDialog.vue, VoteView.vue, generalDecision/detail.vue, 昆山/ownerDecision/components/MaintainResultDialog.vue, 昆山/optionDecision/components/MaintainResultDialog.vue
- Projeto: 太仓G; sessão: b4e53b8e-164f-4672-9854-192edd804ed5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "general_dialog_kunshan",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->