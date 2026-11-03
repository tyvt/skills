# permit_dialog_func
Componente inline de diálogo de seleção de permissão causa overflow de tabela; substituído por Dialog funcional no projeto 苏州市房地产监测V3.
## Problema
- `<permit-select-dialog>` inline causa overflow de tabela e configuração dispersa
## Solução
- Adicionar `permitSelectConstants.js` unificando colunas e `buildPermitSelectDialogOptions()`
- `permitExtend/detail.vue` e `permitCancel/detail.vue` removem componente e usam `SelectDialog.open()` lendo opções `EXTEND_/CANCEL_PERMIT_SELECT_DIALOG_OPTIONS`
## Arquivos
- permitExtend/detail.vue, PermitSelectDialog.vue, permitCancel/detail.vue, permitExtendConstants.js, MEMORY.md, 2026-09-13.md, presale/permit/components/detail.vue
## Verificação
- Fonte: 苏州市房地产监测V3/053.md; Sessão: ab72e6c1-ca61-4d4b-a2cd-bdb43518c52a

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "permit_dialog_func",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->