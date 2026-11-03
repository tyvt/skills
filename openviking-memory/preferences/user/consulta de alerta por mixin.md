- Em `src/views/benefit/alert/index.vue`, os quatro botões de consulta chamam primeiro `switchWarningType` e depois o `getList()` sem parâmetros do mixin.
- Remove a implementação customizada de `getList` sobrescrita na página.
- Configura `moduleName: 'benefit'` e `businessName: 'warningAnalys'`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Consulta de alerta por mixin",
  "source_extraction_id": "d844f94ca9c9437188f0c9b246ecc583",
  "version": 1,
  "memory_type": "preferences"
}
-->