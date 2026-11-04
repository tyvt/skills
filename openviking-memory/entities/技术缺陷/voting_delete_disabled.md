# Botão de exclusão de item de votação pendente com disabled fixo
O botão de exclusão em VotingItemsTable.vue tinha disabled fixo e não reagia a bizState.

## 问题根因
- O atributo disabled do botão de exclusão em VotingItemsTable.vue estava fixo
- Não acompanhava a mudança de bizState, impedindo clique no estado pendente

## Correção
- Mudar para `:disabled="bizState != '0'"` alinhado ao botão de edição
- Estado pendente (bizState='0') permite clique para excluir

## 验证与归属
- 验证证据: extracted source=cursor session=92a52a39-5ec2-4b9b-afa1-fb9772a75eae
- 涉及文件: optionDecision/components/VotingItemsTable.vue, optionDecision/detail.vue, ownerDecision/components/VotingItemsTable.vue
- 所属项目: 太仓G; sessão: 92a52a39-5ec2-4b9b-afa1-fb9772a75eae; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Bug técnico",
  "name": "voting_delete_disabled",
  "source_extraction_id": "f8326583daa3400db8d64fde3493fd36",
  "version": 1,
  "memory_type": "entities"
}
-->