- Em layout flexível, a coluna esquerda `.sort-left` deve ter `max-height: min(560px, calc(72vh - 160px))` e `min-height: 0`
- O filho `.sort-left-body` deve ter `min-height: 0`, `overflow-y: auto`, `overflow-x: hidden` para scroll ao exceder
- Aplicado em `selectRangeDialog.vue` e `deptTree.vue` (sessão cursor `3fda1aa5-47de-48e9-8ced-e2755c0ecb88`)

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Coluna esquerda com scroll limitado",
  "source_extraction_id": "dff9b0dfa14544cfa914d2f988a5f039",
  "version": 1,
  "memory_type": "preferences"
}
-->