# Largura de diálogo controlada por variável CSS
No projeto Suzhou Real Estate Monitoring V3, a largura de diálogos foi desacoplada de props e centralizada em CSS variables.

## Mudanças
- `zs-select-dialog.vue` define `inheritAttrs: false` e remove `width: 1300px` fixo de `mergedDialogAttrs`
- Estilo scoped remove `:deep(.el-dialog)` e usa estilo global `building-table` para wrapper e `.el-dialog`
- `zs-select-dialog-func.vue` em `sanitize` remove `width`; `SelectDialog.open` elimina slots Vue 2 e não passa `width` a `zs-dialog`
- `RegulatoryAccountDialog.vue` e `scope-select-dialog` também param de injetar `width: 1300px`

## Arquivos Envolvidos
- `views/supervision/utils/selectDialog.js`
- `views/components/SelectDialog.vue`
- `views/supervision/deposit/refund/detail.vue`
- `views/supervision/utils/selectDialog/generic.js`
- `views/supervision/utils/selectDialog/regulatoryAccount.js`
- `components/zs-select-dialog/zs-select-dialog-func.vue`
- `styles/index.scss`
- `components/zs-dialog/zs-dialog.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/026.md
- ID de sessão: e2df1fba-88d3-49d5-bd1b-602953368329
- 所属项目: Suzhou Real Estate Monitoring V3; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_width_css_var",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->