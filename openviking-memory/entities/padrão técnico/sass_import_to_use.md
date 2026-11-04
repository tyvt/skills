# Migração de @import para @use em Sass
Substituir @import por @use em componentes Vue elimina avisos de depreciação do Sass.

## Contexto
- 9 componentes usavam @import './overviewEmpty.scss'.

## Solução
- Alterado para `@use './overviewEmpty.scss' as *;`, comportamento de estilo inalterado, sem avisos.

## Arquivos e origem
- Arquivos: publicQuery/complex/detail.vue, propertyContractTable.vue, buildingTable.vue, committeeTable.vue, advertiseTable.vue, index.vue, subTableMixins.js, table.js.
- Evidência: sessão cursor=4f89ea4c-149b-4217-b962-c76fcfb5aaea.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "sass_import_to_use",
  "source_extraction_id": "101ea3de48ee43dbb0f0a7c8a375f9f1",
  "version": 1,
  "memory_type": "entities"
}
-->