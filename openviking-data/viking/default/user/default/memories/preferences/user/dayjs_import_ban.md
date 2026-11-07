- Forbid `import dayjs` in Vue SFCs; Rollup bundles it into an ESM chunk that overrides the UMD `dayjs.min.js` loaded via `<script>` in index.html.
- Use the global `Vue.prototype.dayjs` instance mounted in main.js instead of importing dayjs locally.
- Applies to the Xinghua property management (兴化物管) zhi1-web-admin project.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dayjs_import_ban",
  "source_extraction_id": "dfed095b4ba749ebb4b9c32e8aad66f8",
  "version": 1,
  "memory_type": "preferences"
}
-->