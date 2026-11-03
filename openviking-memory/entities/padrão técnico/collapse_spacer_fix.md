# Sobreposição de estilo e elemento espaçador causavam perda de espaçamento
No projeto Park Public Benefit (zhi2-web-admin), a regra :deep em pubHouse/detail.vue e o elemento espaçador em RegionTreeLayout.vue causavam perda de espaçamento entre blocos em páginas de lista globais.

## Causa raiz
- pubHouse/detail.vue continha :deep(.collapse-container + .collapse-container){margin-top:0} sobrescrevendo o espaçamento global do componente Headline
- RegionTreeLayout.vue continha o espaçador .type-left-toolbar-spacer (min-height:32px+margin:5px 0) causando espaço em branco no topo

## Solução
- Removida a sobreposição, restaurando margin-top:12px global entre blocos adjacentes
- Removido o elemento espaçador e estilo em RegionTreeLayout.vue, afetando 15 páginas de lista globais

## Arquivos envolvidos
- src/views/benefit/pubHouse/detail.vue
- src/components/Headline/index.vue
- src/views/property/complex/components/RegionTreeLayout.vue

## Verificação e atribuição
- Projeto: Park Public Benefit; sessão: 10639736-d230-4e7f-93b8-169a25bf4221; base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "collapse_spacer_fix",
  "source_extraction_id": "3c18306e48da4914b8243df1c7df3e52",
  "version": 1,
  "memory_type": "entities"
}
-->