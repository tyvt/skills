# Botão de término antecipado oculto sem estado de adiamento
Na página de detalhe de decisão geral (generalDecision/detail.vue), o botão de término antecipado não aparecia no estado de adiamento.

## 问题根因
- Botão "término antecipado" exibia apenas quando `decisionState == '2'`
- Estado de adiamento (`'5'`) não atendia à condição

## Correção
- Em `detail.vue` o `v-if` do botão incluiu `decisionState == '5'`
- Mantida a verificação de permissão, alinhado a outras páginas de decisão

## Verificação e arquivos
- Sessão de origem: 5498a264-de28-46af-8525-e64606a2220e
- 涉及文件: generalDecision/detail.vue, ownerDecision/detail.vue, optionDecision/detail.vue, sortDecison/detail.vue, maintainDecision/detail.vue
- 所属项目: 太仓G; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "early_end_delay_state",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->