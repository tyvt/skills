# Estado vazio de tabela bancária não deve fixar linhas
O `:table-tr="5"` fixo em `BankAccountTable.vue` causava espaço em branco não compacto e botão desalinhado no estado vazio.

## 问题根因
- `:table-tr="5"` escrito fixo gera espaço em branco não compacto quando sem dados
- Botão não alinhado com o título no estado vazio

## 解决方案
- Em `BankAccountTable.vue` (supervision/agreement/account e property/propertyAccount) envolver com `Headline`
- Mover botão para slot `#right`
- `:table-tr` vinculado a `itf_bankList.length` dispara estado vazio compacto do `zs-table`
- Adicionar props como `titleText` para unificar layout

## Arquivos e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/121.md
- 涉及文件: supervision/agreement/account/detail.vue, property/propertyAccount/components/BankAccountTable.vue, Headline/index.vue, zs-table/zs-table.vue, styles/index.scss, benefit/pubRegulatoryAccount BankAccountTable.vue e detail.vue
- 所属项目: 苏州市房地产监测V3; sessão: a5d89768-99be-4451-84bf-85a35b766c41; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_empty_state",
  "source_extraction_id": "9949a745ce6a40b6bab523d20bf2a550",
  "version": 1,
  "memory_type": "entities"
}
-->