# Cache de nó de árvore em diálogo de seleção árvore+tabela
No projeto 园区物管2.0, no cenário de diálogo com árvore à esquerda e tabela de detalhes à direita (SelectDialog.open / zs-select-dialog-func), o preenchimento dos dados principais deve usar o nó selecionado na árvore à esquerda.

## Descrição do problema
- As linhas paginadas à direita frequentemente não têm campos de nível de árvore ou estão incompletos; ler apenas a row causa preenchimento vazio ou incorreto
- O componente ao abrir tem clique de nó de árvore padrão para ter seleção inicial mesmo sem clique manual

## Solução
- Declarar selectedTreeRow antes de open, onTreeClick grava o nó selecionado em tempo real
- No then, usar selectedTreeRow para atribuir businessItemId/Code/Name, sem assumir que a row à direita traz todos os businessItem*

## Verificação e afiliação
- Verificação: sessão 1aa18ac2, pubPaymentNotice/detail.vue showBusinessItemDialog alterado para cache onTreeClick + selectedTreeRow preenche businessItem*
- Arquivos: zhi2-web-admin/src/views/benefit/pubPaymentNotice/detail.vue, zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue
- Projeto: 园区物管2.0; baseline: 7814a0c2a; sessão: 1aa18ac2-4320-4a6b-abb4-c64bc4cfcd68

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "select_tree_cache",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->