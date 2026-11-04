# Sass substitui @import por @use para remover avisos
Em 9 componentes, `@import './overviewEmpty.scss'` foi trocado por `@use './overviewEmpty.scss' as *;` eliminando avisos de depreciação.

## 描述
- O Sass descontinuou @import; seu uso gera avisos de compilação.
- A troca para @use mantém o comportamento de estilo inalterado.

## 解决方案
- Alterado para `@use './overviewEmpty.scss' as *;` nos 9 componentes.
- Compilação sem avisos de depreciação.

## Arquivos e origem
- 涉及文件: publicQuery/complex/detail.vue; publicQuery/complex/components/propertyContractTable.vue; publicQuery/complex/components/buildingTable.vue; publicQuery/complex/components/committeeTable.vue; publicQuery/complex/components/advertiseTable.vue; publicQuery/complex/index.vue; mixins/subTableMixins.js; mixins/table.js.
- 验证证据: cursor session=4f89ea4c-149b-4217-b962-c76fcfb5aaea.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_import_use",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->