# dayjs como variável global externa no Vite

Fato de configuração onde dayjs é global externo via CDN, não dependência npm.

## 描述
- `vite.config.js` configura `dayjs` como variável global externa (injetada via CDN), não como dependência npm.
- `import dayjs from 'dayjs'` dispara ESLint `import/no-unresolved`.
- Deve-se remover o import e usar `dayjs` global diretamente.

## Impacto
- Afeta projetos como zhi2-web-admin e 综合查询.


<!-- MEMORY_FIELDS
{
  "category": "configuração de build",
  "name": "dayjs_vite_global",
  "source_extraction_id": "f43c7056662240278d1b1ff7669d9a4f",
  "version": 1,
  "memory_type": "entities"
}
-->