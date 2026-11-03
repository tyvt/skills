# Estilo de diálogo funcional de seleção divergente
No projeto Suzhou Real Estate Monitoring V3, `SelectDialog.open` tinha bordas extras e layout divergindo do componente padrão.

## Problema
- `SelectDialog.open` possuía `list-card` com borda extra e classe de alinhamento à direita no rodapé compact
- Paginação posicionada dentro da tabela causando desalinhamento

## Correção
- Remover `list-card` e classe de rodapé compact; mover paginação para fora da tabela com `margin-top:12px; padding:12px 0 0` em estilo scoped
- Alinhar com estrutura `select-dialog-table-wrap` e `dialog-footer` centralizado de `zs-select-dialog.vue`
- Manter lógica de paginação frontend `clientPagination` sem afetar layout

## Arquivos Envolvidos
- `views/company/companyCancel/index.vue`
- `components/zs-select-dialog/zs-select-dialog-func.vue`
- `views/company/companyApplyAudit/index.vue`
- `components/zs-dialog/zs-dialog.vue`
- `components/zs-pagination/zs-pagination.vue`
- `views/presale/cashsale/components/CashsaleSelectBuildingDialog.vue`
- `views/building/houseLimit/components/HouseSelectDialog.vue`
- `views/property/workOrder/order/components/BatchReplyDialog.vue`

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/025.md
- ID de sessão: 81825ca3-8f1a-442f-a106-ef98a5c8c238
- Projeto: Suzhou Real Estate Monitoring V3; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "select_dialog_style",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->