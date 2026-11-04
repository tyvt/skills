# Modo de manutenção de pessoal G-end somente campo de função editável
No projeto 苏州市房地产监测V3, quando `isGTerminalPersonnelMaintainEdit` é true, apenas o campo `人员角色` (função do pessoal) fica editável; demais campos são bloqueados via `maintainOtherFieldsDisabled`.

## Comportamento
- `isGTerminalPersonnelMaintainEdit` true -> só `人员角色` sem `:disabled` editável
- Outros campos bloqueados por `maintainOtherFieldsDisabled`
- `handleSave` ignora validação de exigências (要件校验)

## Condições de ramificação G-end
- Lista e detalhe alinham ramos G-end com `isGTerminal`, `bizState==='2'`, `!isPersonnelCancelled`

## Arquivos envolvidos
- AgencyPersonnelDetail.vue
- AgencyPersonnelList.vue
- LeasePersonnelDetail.vue
- detailMixins.js
- main.js
- e2e spec
- personnelRecord/components/detail.vue

## Verificação
- Sessão: c622c348-e873-4a4f-9936-9bbb4eab54d2
- 所属项目: 苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "g_terminal_personnel_edit",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 1,
  "memory_type": "entities"
}
-->