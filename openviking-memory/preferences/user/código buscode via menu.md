- Prefere obter `busCode` de `permitExtend` e `permitCancel` resolvendo a partir de `route.meta.busCode` e `filePath` com fallback para menus (ex.: `presale/permitExtend/index`), em vez de hardcoded em `permitExtendConstants.js`/`permitCancelConstants.js`.
- `detail.vue` usa `resolveExtendAppendixBusCode`/`resolveCancelAppendixBusCode` para essa resolução.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Código busCode via menu",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 1,
  "memory_type": "preferences"
}
-->