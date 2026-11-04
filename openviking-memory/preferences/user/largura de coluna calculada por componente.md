- Em `HomeTodoTable.vue` remove todas as `width`/`min-width`; `zs-table-column` calcula largura por canvas conforme conteúdo: <280px gera `width` fixo sem ampliar, maior gera `min-width` elástico; limite controlado por `SHORT_COLUMN_FIX_THRESHOLD` (280).
- Arquivos: HomeTodoTable.vue, homeLayout.js, package.json, zs-table-column.vue, zs-table.vue, homeDataMixin.js, zs-operate-column.vue.
- Evidência: src=门户/017.md; sessão: fd264e18-0e1a-4414-bf35-742d17d79c11

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Largura de coluna calculada por componente",
  "source_extraction_id": "683e24bb833d49fc8c75225cd2166982",
  "version": 1,
  "memory_type": "preferences"
}
-->