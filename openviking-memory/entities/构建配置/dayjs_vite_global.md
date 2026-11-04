# dayjs 作为 Vite 中的外部全局变量

一种配置情况，其中 dayjs 是通过 CDN 引入的外部全局变量，而不是 npm 依赖。

## 描述
- `vite.config.js` 将 `dayjs` 配置为外部全局变量（通过 CDN 注入），而不是 npm 依赖。
- `import dayjs from 'dayjs'` 会触发 ESLint 的 `import/no-unresolved` 错误。
- 应移除该 import，并直接使用全局 `dayjs`。

## 影响
- 影响诸如 zhi2-web-admin 和 综合查询 等项目。

<!-- MEMORY_FIELDS
{
  "category": "configuração de build",
  "name": "dayjs_vite_global",
  "source_extraction_id": "f43c7056662240278d1b1ff7669d9a4f",
  "version": 1,
  "memory_type": "entities"
}
-->