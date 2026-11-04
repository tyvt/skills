# Pop-up de seleção de conta não reutilizava zs-select-dialog
accountNameDialog.vue usava zs-dialog+zs-table customizados, divergente do padrão zs-select-dialog.

## Descrição
- accountNameDialog.vue implementava estilo antigo próprio com zs-dialog e zs-table.
- Inconsistência de aparência e interação com zs-select-dialog.

## Solução
- Reutilizado internamente zs-select-dialog para unificar estilo.
- Padronizadas altura de linha, ausência de borda, formulário de busca, paginação e seleção única/múltipla.

## Arquivos
- zhi2-web-admin/src/views/maintenance/accountSplit/detail.vue
- zhi2-web-admin/src/views/maintenance/accountSplit/components/accountNameDialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/SKILL.md
- zhi2-web-admin/src/views/maintenance/accountSplit/components/AccountListTable.vue
- zhi2-web-admin/src/views/maintenance/accountCancel/components/ChangeApplyDialog.vue
- zhi2-web-admin/src/views/maintenance/depositNotice/components/AccountDetailDialog.vue

## Relações
- Sessão fonte: c7c58078-a865-450f-bba0-bff68effa3c3 (cursor)
- Projeto: produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "account_dialog_no_reuse",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->