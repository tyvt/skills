# Árvore de região configurável para ordens de serviço
O componente region-tree-layout aceita URL e parâmetros de árvore configuráveis, repassados até regionTree.vue.

## Description
- index.vue define tree-url='/system/dept/complexTree' e :tree-params='{}' no region-tree-layout
- RegionTreeLayout.vue expõe propriedades treeUrl e treeParams, repassando para regionTree.vue
- Quando treeParams está vazio, nenhum parâmetro de consulta é enviado à interface

## Purpose
- Tornar a árvore de regiões configurável por página de lista de ordens de serviço

## Relations
- Resposta compatível com estrutura id/label/children do componente existente
- 涉及文件: property/workOrder/order/index.vue, complex/components/RegionTreeLayout.vue, complex/components/regionTree.vue, mixins/listMixins.js, mixins/table.js
- Sessão cursor: ca01e574-0616-48a5-8f5a-4a6bbe304b4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_config",
  "source_extraction_id": "e8a7bac845c54be09b1a363a7c43e8e5",
  "version": 1,
  "memory_type": "entities"
}
-->