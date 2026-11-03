# Passagem Errônea de index em zs-table-column Quebra Clique de Link
A refatoração de zs-table-column.vue vazava index/function para el-table-column e quebrava o type="link".

## Problema e Correção
- index/function passados para el-table-column causavam conflito de atributos nativos
- type="link" falhava ao usar scope.column.type para julgamento
- Colunas não index interceptam passagem de index/function; usa $attrs.type para julgamento, compatibilizando :index="handler" antigo e type="link" :function="handler" novo

## Verificação
- Evidência: src=苏州市房地产监测V3/062.md
- Arquivos: BranchOneDialog.vue; YhwdDialog.vue; YhwdTable.vue; zs-table-column.vue; tableColumnConfig.js; pubRegulatoryBranchDialog.vue; zs-select-dialog.vue; zs-select-dialog-func.vue
- Sessão: bb86fbc4-fb2e-46ab-8ef7-7ec642005b52; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "table_index_passthrough",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 1,
  "memory_type": "entities"
}
-->