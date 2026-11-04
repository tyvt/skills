- To avoid TS language service memory overflow and Volar hybrid mode conflict crashes, config must be in user-level `%APPDATA%\Cursor\User\settings.json`.
- Set `typescript.tsserver.maxTsServerMemory` to `8192` and `vue.server.hybridMode` to `false`.
- Exclude `node_modules`/`dist`/`unpackage` from watch and search.
- Reload via `Developer: Reload Window`; disable Vetur and old Volar, keep only `Vue - Official`.
- Verification: src=苏住房C/078.md; files include C:\Users\Administrator\AppData\Roaming\Cursor\User\settings.json etc.; session 6911ad2f-da24-42ab-a070-15f71b1f2ffa

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "cursor_ts_config",
  "source_extraction_id": "356d1858e539467da8dfffd82a8f6bf9",
  "version": 1,
  "memory_type": "preferences"
}
-->