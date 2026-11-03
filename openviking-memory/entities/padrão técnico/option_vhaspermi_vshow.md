# Conflito v-hasPermi e v-show gera botões extras
No arquivo optionDecision/detail.vue do projeto 太仓G, o conflito entre v-show e v-hasPermi causava botões redundantes.

## Causa raiz
- Botões de rodapé usavam `v-show` e `v-hasPermi` simultaneamente
- Ao passar na permissão, `v-hasPermi` executa `el.style.display = ''` sobrepondo `none` do v-show

## Correção
- 7 botões de negócio em `optionDecision/detail.vue` trocaram `v-show` por `v-if`
- Quando condição falsa, não renderiza evitando interferência

## Verificação e arquivos
- Sessão de origem: d78da6c5-2f67-48d6-9fd2-d7742debc541
- Arquivos: optionDecision/detail.vue, OperationContainer/index.vue, detailMixins.js, ownerDecision/detail.vue, optionDecision/index.vue, sortDecison/detail.vue, main.js, directives/permission/hasPermi.js
- Projeto: 太仓G; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "option_vhaspermi_vshow",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->