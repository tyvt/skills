# PermitPlanPanel oculta botão de manutenção com imagem vazia
No 苏州市房地产监测V3, `PermitPlanPanel` renderiza imagem vazia quando não mantido e não operável, cobrindo a entrada de manutenção.

## 问题根因
- `PermitPlanPanel` renderiza `AppendixEmpty` quando não mantido e `operable===false`
- Botão «manutenção» só aparece quando `operable===true`; imagem cobre a entrada

## Correção
- `PermitPlanPanel.vue` remove imagem vazia quando não mantido
- Adiciona `showMaintainButton` (mostra quando não somente-leitura e editável ou não mantido)
- `detail.vue` passa `planPanelReadonly` e `canOperatePlan` para alinhar botões e navegação

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-rest/073.md
- 涉及文件: AppendixRequirementCard.vue, PermitInfoPanel.vue, PermitPlanPanel.vue, detail.vue, Headline/index.vue, AppendixEmpty/index.vue, index.vue, CashsaleDetail.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 5c95c517-e8ad-4225-b0de-55c6271384c8; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_plan_maintain_occlusion",
  "source_extraction_id": "f3025b0b72ad4d9da2b7a5d18356898a",
  "version": 1,
  "memory_type": "entities"
}
-->