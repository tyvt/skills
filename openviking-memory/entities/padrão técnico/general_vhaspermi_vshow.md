# v-hasPermi sobrepõe v-show ocultando botões
Na página generalDecision/detail.vue do projeto 太仓G zhi1-web-admin, botões de rodapé usavam v-show e v-hasPermi, causando redundância.

## Causa raiz
- Uso simultâneo de `v-show` e `v-hasPermi` em botões de rodapé
- `v-hasPermi` define `display:''` quando há permissão, sobrepondo o ocultamento do v-show

## Correção
- Adicionado propriedade computada `isSubmittedBiz`
- Substituído por `v-if` + `checkPermission()` com condições mescladas

## Verificação e arquivos
- Sessão de origem: 3c3a27ee-5748-4f83-bd05-d3e2e69d6434
- Arquivos: ownerDecision/detail.vue, mixins/detailMixins.js, optionDecision/detail.vue, optionDecision/index.vue, sortDecison/detail.vue, OperationContainer/index.vue, ownerDecision/index.vue, generalDecision/detail.vue
- Projeto: 太仓G; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "general_vhaspermi_vshow",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->