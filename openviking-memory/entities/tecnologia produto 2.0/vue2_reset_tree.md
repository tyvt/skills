# @reset instável no Vue 2 e reset incompleto da árvore
No zhi2-web-admin do produto 2.0, o evento @reset do Vue 2 não acionava de forma estável o componente pai, e após filtrar a árvore à esquerda limpar só a palavra-chave não recuperava os nós.

## 问题根因
- no Vue 2 o evento @reset não disparava de forma estável o componente pai
- após filtrar a árvore à esquerda, limpar só a palavra-chave era insuficiente para restaurar os nós, deixando o reset incompleto

## 解决方案
- selectRangeDialog injeta resetRangeFilter via provide/inject para o resetQuery do rangeTable chamar diretamente
- ordem de reset: queryParams à direita, filtro de distrito à esquerda, requisição em nextTick
- a árvore à esquerda usa treeRenderKey para re-renderizar e limpar o realce da caixa de busca
- deptTree remove listener queryData inválido

## 验证与归属
- 验证证据: src=产品2.0/048.md
- 涉及文件: zhi2-web-admin/src/views/system/message/components/selectRangeDialog.vue, rangeTable.vue, deptTree.vue, src/mixins/subTableMixins.js, table.js, area.js, src/components/zs-search-form/zs-search-form.vue, QueryResetButtons.vue
- 所属项目: produto 2.0; sessão: e8e1b511-6b3a-4a1c-a292-a25e3a8b00fd; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia produto 2.0",
  "name": "vue2_reset_tree",
  "source_extraction_id": "794b625f596c43eeb4179370fbaced2a",
  "version": 1,
  "memory_type": "entities"
}
-->