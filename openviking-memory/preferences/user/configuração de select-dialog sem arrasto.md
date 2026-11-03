- Em `zs-dialog.vue`, no cenário `select-dialog`, desativar `v-dialogDrag` para evitar conflito com layout `absolute+top:15vh` e flex center de `drag.js`.
- Quando `top` não for passado explicitamente, escrever `attrs` com padrão `'0'` para evitar `margin-top` padrão do Element.
- Usar `--zs-dialog-select-wrapper-padding` para unificar espaçamento e cálculo de `max-height`.
- Evidência: `苏州市房地产监测V3-rest/035.md`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Configuração de select-dialog sem arrasto",
  "source_extraction_id": "f95f644aa4cd4dae810385ea25b18d7d",
  "version": 1,
  "memory_type": "preferences"
}
-->