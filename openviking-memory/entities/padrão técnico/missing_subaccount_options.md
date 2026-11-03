# missing_subaccount_options
O dictFormatter global procura {prop}Options por coluna; páginas de detalhe ausentes causam coluna vazia.

## Causa raiz
- depositNotice/components/detail.vue e company/components/detail.vue carregavam apenas yesOrNoOptions, sem hasSubAccountOptions
- dictFormatter global busca {prop}Options pela prop da coluna; ausência deixa coluna vazia

## Solução
- Adicionar hasSubAccountOptions em data e atribuir sys_yes_no via initDict

## Arquivos envolvidos
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/depositNotice/components/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/depositNotice/company/components/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/settlementAccount/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/main.js
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/components/DepositTypeDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/settlementAccount/index.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/mixins/detailMixins.js

## Verificação
- Prova: src=园区公共收益/020.md
- Sessão de origem: 7e4c18c0-5ce0-41ce-b4dd-d28988df5d00; base de código: none
- Projeto: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "missing_subaccount_options",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "entities"
}
-->