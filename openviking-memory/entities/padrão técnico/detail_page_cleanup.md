# Limpeza de código não utilizado em página de detalhe copiada
Padrão de remover mixins e componentes duplicados ao copiar página de detalhe.

## Descrição
- `publicQuery/complex/detail.vue` copiado de `property/complex/detail.vue` trazia mixin `area` duplicado e componente `houseTable` não usado.
- Removidos campos de data relacionados e estilos `property-type-*`.
- Mesclagem de dados de interface ainda feita por `detailCallback`.

## Arquivos Envolvidos
- `publicQuery/complex/detail.vue`, `property/complex/detail.vue`
- `mixins/detailMixins.js`, `mixins/area.js`, `mixins/form.js`

## Verificação
- Fonte: cursor session=117b67e8-4e61-4da7-9503-e0038e998ea7

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "detail_page_cleanup",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->