# Estilo global esmaga el-col filho direto de zs-form
No zs-dialog, o estilo global `.form-box .zs-form > .el-col` força `width:100%` apenas nos el-col filhos diretos de zs-form; a estrutura original `zs-form > el-row > el-col` não era afetada, mantendo layout de várias colunas.

## Causa raiz
- O seletor `.form-box .zs-form > .el-col` aplica `width:100%` somente a filhos diretos de zs-form
- Estrutura `zs-form > el-row > el-col` não coincide com o seletor, preservando múltiplas colunas

## Solução
- Mover `el-row` para fora de `zs-form` para que `el-col` se torne filho direto
- Seguir a estrutura de `PaymentBuildingDialog.vue` para obter linha única e coluna única

## Arquivos envolvidos
- NodeDetailsDialog.vue, PaymentBuildingDialog.vue, NodeDetailsTable.vue
- detail-form.scss, index.scss, zs-dialog.vue, BuildingChangeDialog.vue

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-rest/139.md
- Sessão de origem: dababdf0-87af-4d0b-95f2-6a4f1ceb21fd; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "zs_elcol_fullwidth",
  "source_extraction_id": "11e2b1a202ee409c843bf7caaf319a48",
  "version": 1,
  "memory_type": "entities"
}
-->