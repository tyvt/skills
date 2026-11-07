# Vite Cursor Vue Inspector
In vite.config.js dev mode, add vite-plugin-vue-inspector with launchEditor set to cursor so Vue DevTools Open in editor locates .vue source in Cursor. Requires preinstalled Cursor CLI tool.

## Configuration
- Add vite-plugin-vue-inspector middleware in dev mode
- Configure Inspector({ vue: 2, launchEditor: 'cursor' })
- Preinstall Cursor command-line tool for source locating

## Verification and Attribution
- Verification: extracted source=cursor session=201b4044-01f8-481f-b99a-865806fff350
- Files: zhi1-web-admin/vite.config.js, zhi1-web-admin/package.json
- Project: Xinghua property management zhi1-web-admin; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "vite_cursor_inspector",
  "source_extraction_id": "2df6cf0a466f49eb8a7ddc9e7c5b735d",
  "version": 1,
  "memory_type": "entities"
}
-->