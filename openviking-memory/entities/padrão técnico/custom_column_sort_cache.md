# Falha em ordenação custom de colunas por cache e config não persistida
No projeto 淮安物管 (zhi2-web-admin), el-table não reordena ao trocar apenas ordem de v-for; displayColumns não restaurado de localStorage e dados antigos sem campo order causam NaN.

## Problema
- Element UI el-table mantém cache de colunas ao só trocar ordem em v-for, não re-renderiza
- displayColumns após refresh não recupera de localStorage; dados antigos sem order geram NaN na ordenação

## Solução
- Em mixins/table.js adicionar tableColumnsKey e restaurar de localStorage quando Vuex vazio
- Ordenar com (a.order ?? 0) - (b.order ?? 0)
- Em mixins/ListTemplate.js bind :key para reconstruir tabela

## Verificação
- Sessão cursor 23259f03-6ebe-4aaa-8a85-fd3a770bfa1b
- Arquivos: src/views/autonomy/regulation/components/index.vue, src/components/global-table-config/global-table-config.vue, src/mixins/table.js, src/mixins/listMixins.js, src/mixins/ListTemplate.js, src/store/modules/table.js, src/components/zs-table-column/zs-table-column.vue, src/components/zs-table/zs-table.vue

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "custom_column_sort_cache",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->