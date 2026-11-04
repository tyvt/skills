- Prefere `import.meta.env.VITE_APP_BASE_API` em vez de `process.env` no Vite, pois `process.env` não é suportado e dispara Vue warn
- Migra escritas legadas (ex.: imgBlock.vue, contractTable.vue) de `process.env` para `import.meta.env`, alinhando com `api/index.js`
- Elimina globalmente referências a `process.env` no projeto

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Estilo de código Vite",
  "source_extraction_id": "804f3591fe264d2e93c18d6c856df3ec",
  "version": 1,
  "memory_type": "preferences"
}
-->