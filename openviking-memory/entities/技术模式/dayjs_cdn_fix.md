# 产品2.0 dayjs 外部全局变量误用 import 触发 ESLint 修复
产品2.0 中 `dayjs` 在 `vite.config.js` 配置为外部全局变量（CDN 注入），误用 npm import 导致 ESLint 报错，已修复。

## 问题根因
- `dayjs` 在 `vite.config.js` 中配置为外部全局变量（CDN 注入），不是 npm 依赖
- `import dayjs from 'dayjs'` 会触发 ESLint 的 `import/no-unresolved`

## 修复内容
- 删除该 import，改为与项目其他页面一样直接使用全局 `dayjs`
- 本地 ESLint 已通过，可重新提交

## 验证与归属
- 涉及文件：`vite.config.js`、`综合查询/src/page-query/data-overview.vue`、`综合查询/src/api/query.js` 等
- 所属项目：产品2.0；来源会话ID：808e7d2a-9e33-4f47-ab47-d07c4fa04826
- 验证证据：extracted source=cursor project=产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dayjs_cdn_fix",
  "source_extraction_id": "b12861a579a6400884413657f5f2a484",
  "version": 1,
  "memory_type": "entities"
}
-->