
- Em diálogos (zs-dialog), o estilo global `zs-form > .el-col { width: 100% }` ou `.form-box .zs-form > .el-col` esmaga o layout de duas colunas para coluna única; manter `el-row`/`el-col` dentro de `zs-form` para evitar override.
- `ParcelDialog.vue` implementa duas colunas com `el-row :gutter="32"` e `el-col :span="12"` envolvendo 8 campos; rótulo `label-position="left"` largura 120px via CSS scoped sem `label-width`; controles `width: 100%` e `:deep` para fallback de datas; área do mapa permanece largura total.
- Ao usar `zs-form`, definir `zs-size="mini"`, `label-position="left"` e `label-width="120px"` e limpar dados redundantes.
- Evidência: src=苏州市房地产监测V3-leftover/002.md e src=苏州市房地产监测V3-rest/018.md; sessões e55d472c-5d5c-48cc-be69-456859ec148f e b5f6bfd3-4e42-4e3e-bed9-19ac9eddac86.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dialog_form_layout",
  "source_extraction_id": "261683e4b6f6441e994fe34ffbde724a",
  "version": 2,
  "memory_type": "preferences"
}
-->