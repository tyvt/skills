# Caixa de seleção de userTable não renderizada por falta de bizState
Coluna de checkbox em userTable.vue tinha v-if="bizState=='0'", mas selectUserDialog não passava bizState.

## 描述
- userTable.vue condicionava coluna de seleção a bizState === '0'.
- selectUserDialog não transmitia bizState, deixando-o undefined e ocultando coluna.

## 解决方案
- Removido v-if para exibir coluna de checkbox permanentemente.
- Usuários já selecionados continuam desabilitados via isSelectable.

## Arquivos
- zhi2-web-admin/src/views/benefit/pubUseMoneyApply/detail.vue
- zhi2-web-admin/src/views/msg/notice/components/selectUserDialog.vue
- zhi2-web-admin/src/views/msg/notice/components/userTable.vue
- zhi2-web-admin/src/mixins/subTableMixins.js
- zhi2-web-admin/src/views/msg/notice/components/userNoticeTable.vue

## Relações
- Sessão 来源: 5687225e-f8a8-4719-a9e7-c4013411f266 (cursor)
- 所属项目: produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_table_bizstate_missing",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->