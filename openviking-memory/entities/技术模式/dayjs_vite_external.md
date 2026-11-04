# dayjs como variável global externa no Vite

No `vite.config.js` o `dayjs` é configurado como variável global externa (injetada via CDN) e não como dependência npm, causando erro de import.

## 描述
- `import dayjs from 'dayjs'` dispara ESLint `import/no-unresolved`.
- Deve-se remover o import e usar o `dayjs` global diretamente.

## Relações
- Arquivos afetados: `综合查询/src/page-query/data-overview.vue`, `综合查询/src/api/query.js`, `zhi2-web-admin/src/views/publicQuery/assessment/index.vue`, `综合查询/src/page-query/components/StatisticsDeadline.vue`, `zhi2-web-admin/src/views/publicQuery/complex/index.vue`, `综合查询/src/utils/formatter.js`, `zhi2-web-admin/src/api/index.js`, `zhi2-web-admin/src/views/evaluation/surveyRelease/statistics/components/RangeTable.vue`.
- 来源: sessão cursor 808e7d2a-9e33-4f47-ab47-d07c4fa04826.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dayjs_vite_external",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 1,
  "memory_type": "entities"
}
-->