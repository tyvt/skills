
# Bug de configuração de máximo de opções em dialog de votação
No zhi2-web-admin (Huishan Fase 2G), `VotingItemsDialog.vue` no modo visualização (`DetailTemplate` `contentInfo`) configurava apenas `minOptionNum` erroneamente rotulado "选择项", faltando `mixOptionNum`, inconsistente com edição.

## Problema
- `VotingItemsDialog.vue` modo detalhe: `contentInfo` só tinha `minOptionNum` mal nomeado como "选择项" (itens selecionados)
- Ausência de `mixOptionNum` causava divergência com modo edição

## Correção
- Alterado `contentInfo` para "最少选择项" (mínimo de seleção) e adicionado "最多选择项" (`mixOptionNum`)
- Exibido quando múltipla escolha (`optionType==='1'`)

## Arquivos
- src/views/autonomy/multiply/components/VotingItemsDialog.vue
- src/views/autonomy/option/components/VotingItemsDialog.vue
- src/views/autonomy/option/components/VoteView.vue
- src/views/autonomy/option/detail.vue

## Verificação
- Sessão cursor: 5f4bd9ba-c920-4b33-ab4f-5d2525ca5150; base de código: none


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "voting_items_dialog_optionnum_bug",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 1,
  "memory_type": "entities"
}
-->