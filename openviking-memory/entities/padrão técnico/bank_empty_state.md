# Estado vazio de tabela bancária não deve fixar linhas
O `:table-tr="5"` fixo em `BankAccountTable.vue` causava espaço em branco não compacto e botão desalinhado no estado vazio.

## Causa Raiz
- `:table-tr="5"` escrito fixo gera espaço em branco não compacto quando sem dados
- Botão não alinhado com o título no estado vazio

## Solução
- Em `BankAccountTable.vue` (supervision/agreement/account e property/propertyAccount) envolver com `Headline`
- Mover botão para slot `#right`
- `:table-tr` vinculado a `itf_bankList.length` dispara estado vazio compacto do `zs-table`
- Adicionar props como `titleText` para unificar layout

## Arquivos e Atribuição
- Evidência: src=苏州市房地产监测V3-rest/121.md
- Arquivos: supervision/agreement/account/detail.vue, property/propertyAccount/components/BankAccountTable.vue, Headline/index.vue, zs-table/zs-table.vue, styles/index.scss, benefit/pubRegulatoryAccount BankAccountTable.vue e detail.vue
- Projeto: 苏州市房地产监测V3; sessão: a5d89768-99be-4451-84bf-85a35b766c41; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "bank_empty_state",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "entities"
}
-->