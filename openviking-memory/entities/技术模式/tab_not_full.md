# Tab não ocupa largura total por centralização e largura ausente
`pages_main/my/myContract.vue` tem container pai com `align-items: center` e `tab-line` sem `width: 100%`, fazendo a tab não ocupar toda a largura.

## 问题根因
- Container pai `.my-contract-box` com `align-items: center`
- `tab-line` sem `width: 100%`, não ocupando toda a largura

## Correção
- Definir `width: 100%` em `tab-line`
- Mudar `:deep(.filter)` para `flex` com largura total
- Definir `flex: 1` em `.button` para distribuir igualmente

## Arquivos e verificação
- `src/pages_main/my/myContract.vue`, `src/pages/my/myContract.vue`, `src/components/commonNew/tabLine.vue`
- Também: `src/pages.json`, `info/index.vue`, `stockHouse/index.vue`, `onlineService/index.vue`
- 所属项目: 苏住房C (zhi2-mobile-shimin); sessão: 79b57ec7-807a-4bf3-a5c0-808a9f8fbf51

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "tab_not_full",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->