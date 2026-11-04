# Uso incorreto do popup unificado na votação de fundo de manutenção
A reconstrução da votação de fundo de manutenção usou o popup unificado de Kunshan, divergindo do ambiente do cliente.

## 问题根因
- A reconstrução usou decisionCommon/MaintainResultDialog.vue na versão unificada de Kunshan
- Isso causou inconsistência com o ambiente do cliente

## Correção
- Adicionar verificação isMaintainFund (rota maintain)
- Restaurar interface calculationChart, quatro campos de casas/área, tabela de candidatos sempre visível e botão "确认"

## 验证与归属
- 验证证据: extracted source=cursor session=f57cbb90-c8af-4874-9961-54eca50f5cb8
- 涉及文件: maintainDecision/detail.vue, decisionCommon/components/MaintainResultDialog.vue, ownerDecision/components/MaintainResultDialog.vue, decisionCommon/components/MaintainResultTable.vue, ownerDecision/components/MaintainResultTable.vue, decisionCommon/config.js
- 所属项目: 太仓G; sessão: f57cbb90-c8af-4874-9961-54eca50f5cb8; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Bug técnico",
  "name": "maintain_fund_dialog",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->