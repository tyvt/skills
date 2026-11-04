# Sass substitui @import por @use para remover avisos
Em 9 componentes, `@import './overviewEmpty.scss'` foi trocado por `@use './overviewEmpty.scss' as *;` eliminando avisos de depreciação.

## Descrição
- O Sass descontinuou @import; seu uso gera avisos de compilação.
- A troca para @use mantém o comportamento de estilo inalterado.

## Solução
- Alterado para `@use './overviewEmpty.scss' as *;` nos 9 componentes.
- Compilação sem avisos de depreciação.

## Arquivos e origem
- Arquivos: publicQuery/complex/detail.vue; publicQuery/complex/components/propertyContractTable.vue; publicQuery/complex/components/buildingTable.vue; publicQuery/complex/components/committeeTable.vue; publicQuery/complex/components/advertiseTable.vue; publicQuery/complex/index.vue; mixins/subTableMixins.js; mixins/table.js.
- Evidência: cursor session=4f89ea4c-149b-4217-b962-c76fcfb5aaea.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "sass_import_use",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->