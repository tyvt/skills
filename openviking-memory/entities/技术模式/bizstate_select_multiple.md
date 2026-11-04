# Formulário busca: bizState múltiplo corrigido
Correção de item de formulário `bizState` que selecionava múltiplo erroneamente por falta de atributo `multiple`.

## 描述
- Arquivo: `zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue`
- Quando `type==='select'` e `model==='bizState'`, `isMultiple` passa a ser `false` sem atributo `multiple` explícito (seleção única)
- Para múltipla seleção, exigir `multiple: true` em `attrs` de `formItems`

## Validação
- 来源: cursor session `0bc574c1-233a-406d-9cc5-678ea3dabed5`
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bizstate_select_multiple",
  "source_extraction_id": "dff9b0dfa14544cfa914d2f988a5f039",
  "version": 1,
  "memory_type": "entities"
}
-->