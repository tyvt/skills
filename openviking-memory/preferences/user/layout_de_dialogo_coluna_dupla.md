- Em `zs-dialog`, o `width:100%` em `zs-form > .el-col` esmaga layout em coluna única.
- `ParcelDialog.vue` usa `el-row :gutter="32"` e `el-col :span="12"` para duas colunas, rótulo à esquerda 120px com CSS scoped, controle 100% com `:deep` fallback.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de diálogo coluna dupla",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "preferences"
}
-->