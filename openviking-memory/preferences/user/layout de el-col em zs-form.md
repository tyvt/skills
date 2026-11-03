- Em `NodeDetailsDialog.vue`, manter `el-row`/`el-col` dentro de `zs-form` para evitar que estilo `.form-box .zs-form > .el-col { width: 100% }` transforme duas colunas em uma.
- Configurar `zs-dialog` com `zs-size="mini"`, `label-position="left"` e `label-width="120px"`.
- Remover campos redundantes em `data` ao aplicar esse padrão.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de el-col em zs-form",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 1,
  "memory_type": "preferences"
}
-->