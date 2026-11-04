- `getFiles` usa `{ noReject: true }` para suprimir Toast de erro HTTP.
- Combina `try/catch` com `Array.isArray` e retorna `[]` silenciosamente em exceção.
- Chamadores não mudam; falha de anexo mostra lista vazia.
- Arquivos: `src/api/common.js`, `src/api/index.js`, `src/api/httpInstance.js`, `src/api/property.js`.
- Validação: sessão 175eae30-82c4-41a9-8ce2-4d7f29dee217.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Requisição de anexo falha silenciosa",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "preferences"
}
-->