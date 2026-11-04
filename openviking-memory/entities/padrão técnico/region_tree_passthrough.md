# Árvore de região com interface configurável e passagem de parâmetros
O componente region-tree-layout recebe treeUrl e treeParams, repassando-os a regionTree.vue, com fallback quando vazio.

## Description
- index.vue define tree-url='/system/dept/complexTree' e :tree-params='{}' para region-tree-layout
- RegionTreeLayout.vue adiciona props treeUrl e treeParams repassadas a regionTree.vue
- Quando treeParams está vazio, nenhum parâmetro de consulta é enviado
- Interface retorna estrutura id/label/children compatível com componente existente

## Purpose
- Tornar a árvore de regiões configurável por URL e parâmetros, mantendo compatibilidade

## Relations
- Arquivos: property/workOrder/order/index.vue, property/complex/components/RegionTreeLayout.vue, property/complex/components/regionTree.vue, mixins/listMixins.js, mixins/table.js
- Sessão cursor: ca01e574-0616-48a5-8f5a-4a6bbe304b4b

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "region_tree_passthrough",
  "source_extraction_id": "c5b76c7f353b4c2186e12cd717b9e62b",
  "version": 1,
  "memory_type": "entities"
}
-->