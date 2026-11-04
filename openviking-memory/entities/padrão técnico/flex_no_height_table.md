# Área de tabela em pop-up encolhida por falta de altura flex
Pai flex sem altura definida fez a área de tabela flex:1 encolher para ~120px, mostrando só 2-3 linhas.

## Descrição
- Contêiner pai flex não tinha altura explícita.
- Região de tabela com flex:1 encolhia para altura mínima de cerca de 120px.
- Apenas 2-3 linhas eram visíveis no pop-up.

## Solução
- Altura de dialog-box definida como var(--zs-dialog-content-max-height) (~88vh).
- Cadeia de altura flex conectada de el-dialog até a tabela.
- ResizeObserver sincroniza altura da tabela evitando sobreposição de altura fixa de zs-table.

## Arquivos
- zhi2-web-admin/src/views/maintenance/components/OpeningBuildingDialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/views/maintenance/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OpenDetailTable.vue
- zhi2-web-admin/src/views/maintenance/depositNotice/components/ScopeSelectDialog.vue

## Relações
- Sessão fonte: 082a4d1c-6379-4946-a74a-7dab35a3ffd7 (cursor)
- Projeto: produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "flex_no_height_table",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->