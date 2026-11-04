- `regulatorDialog` deve receber prop `useMoneyApplyType` do formulário pai e construir parâmetros de consulta uniformemente.
- Extrair `buildQueryParams()` para incluir `projectId`/`regulatorProjectId`/`useMoneyApplyType` na chamada `getRegProjectByProId`.
- `handleQuery` deve chamar `getList`; páginas pai (ex.: `guarantee/detail.vue`) passam a prop, compatibilizam `projectId` e limpam campos ao trocar projeto.
- 验证证据: `苏州市房地产监测V3-rest/036.md`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Parâmetros de consulta em diálogos regulatórios",
  "source_extraction_id": "f95f644aa4cd4dae810385ea25b18d7d",
  "version": 1,
  "memory_type": "preferences"
}
-->