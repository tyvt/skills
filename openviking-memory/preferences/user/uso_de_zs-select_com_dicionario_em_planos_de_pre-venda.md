- Em `permitConstants.js`, adicionar `PLAN_DICT_TYPES` e `resolveDictLabel()`; `plan/detail.vue` chama `initDict()` em `created()` via `getDicts`.
- Tipo de uso do solo, finalidade do terreno e se há delegação mudam para `zs-select` ligado a `Options`, removendo opções hardcoded 1/2.
- 验证证据: `苏州市房地产监测V3-rest/035.md`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Uso de zs-select com dicionário em planos de pré-venda",
  "source_extraction_id": "f95f644aa4cd4dae810385ea25b18d7d",
  "version": 1,
  "memory_type": "preferences"
}
-->