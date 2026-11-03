# Exibição de "não selecionado" em votação não obrigatória
Quando a votação não é obrigatória e não foi votada, as áreas de opção em `ViewOptionsList.vue` e `DescribePopup.vue` exibem "暂未选择"; adicionado prop `readOnly`.

## Causa raiz
- Áreas de opção de voto não exibiam estado unificado quando não obrigatório e não votado
- Lógica original dependia de `decisionRequired == '1'`

## Solução
- `ViewOptionsList.vue` e `DescribePopup.vue` exibem "暂未选择" unificadamente
- `DescribePopup.vue` recebe nova prop `readOnly` do componente pai para cenários somente leitura

## Verificação e origem
- Evidência: extracted source=cursor session=ea6407fc-4a97-464f-86b5-f338dfb9dbb6
- Arquivos: src/pages_owner/decision/components/multiple/ViewOptionsList.vue, src/pages_owner/decision/multipleForm.vue, src/pages_owner/decision/components/multiple/DescribePopup.vue, src/pages_owner/decision/components/multiple/OptionCardList.vue
- Projeto: Huishan Fase 2 H5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "vote_unselected_bug",
  "source_extraction_id": "17091e7715aa4ddb9e280040c40385ed",
  "version": 1,
  "memory_type": "entities"
}
-->