# search_form_flex
Conflito de alinhamento flex no formulário de pesquisa causa desalinhamento da caixa de diálogo de dicionário no projeto 苏州市房地产监测V3.
## Problema
- `zs-search-form` linha única `justify="space-between"` conflita com `flex:1` de `form-content-col`
- `align-items: flex-start` do Headline conflita com `align="middle"` do componente e `button-col`
- `el-row` de detalhe erroneamente aplicado a `single-line-row` interfere na largura das colunas
## 解决方案
- Em `index.scss`, ajustar `.search-form-container > .el-row` para `justify-content: flex-start` e unificar atributos de alinhamento
## Arquivos
- DictDataDialog.vue, index.scss, zs-dialog.vue, detail-form.scss, detail.vue, variables.css, DictDataTable.vue
## Verificação
- 来源: 苏州市房地产监测V3/052.md; Sessão: f3c35b72-3629-4796-b668-c4d4ead84829

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_form_flex",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->