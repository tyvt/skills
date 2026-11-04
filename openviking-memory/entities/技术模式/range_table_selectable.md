# selectable mal vinculado inibe votação offline
No componente DecisionRangeTable.vue do projeto 太仓G, linhas submetidas não podiam ser selecionadas para votação offline.

## 问题根因
- `selectable` vinculado erroneamente a `canEditRange` (só rascunho `bizState==='0'` selecionável)
- Quando `bizState='2'` (submetido), linha não selecionável e botão "entrada de voto offline" desabilitado

## Correção
- Nova propriedade computada `isRowSelectable` suporta rascunho ou submetido com votação em curso (`showSuccess && !voteDisabled`)
- Corrigido também módulo `optionDecision`

## Verificação e arquivos
- Sessão de origem: 1e824235-0e5e-44dd-9dc4-238cd6a1389a
- 涉及文件: optionDecision/detail.vue, DecisionRangeTable.vue, VoteRangeDialog.vue, ownerDecision/DecisionRangeTable.vue, ownerDecision/detail.vue, generalDecision/detail.vue, decisionCommon/DecisionRangeTable.vue, zsSelectColumn/index.vue
- 所属项目: 太仓G; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "range_table_selectable",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->