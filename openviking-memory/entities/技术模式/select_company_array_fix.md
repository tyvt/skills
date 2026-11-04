# Resposta de array da API sem proteção causa erro em tabela
No projeto 苏州市房地产监测V3, a interface `selectCompany` retornando `data` como array fazia `res.data.records` ser undefined, levando `getList` a atribuir valor não array a `tableData` e gerar erro de renderização.

## 问题根因
- `selectCompany` retorna `data` como array, tornando `res.data.records` undefined
- `getList` atribuía `tableData` com valor não array causando erro de renderização

## 解决方案
- `zs-select-dialog-func.vue` adicionou `extractListData`/`extractTotal` para analisar caminho de ponto e fallback para `data`/`records`/`list`/`rows`
- Sempre garante que `tableData` seja array
- `resolvedTableTrCount` recebeu tratamento defensivo

## Arquivos envolvidos
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue
- zhi2-web-admin/src/views/company/companyCancel/index.vue
- zhi2-web-admin/src/components/README.md
- zhi2-web-admin/src/mixins/listMixins.js
- zhi2-web-admin/src/mixins/table.js
- zhi2-web-admin/src/views/company/companyCancel/detail.vue

## Verificação
- Sessão: 4367cc38-7b0c-49de-b6aa-65bb248d7532
- 所属项目: 苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_company_array_fix",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 1,
  "memory_type": "entities"
}
-->