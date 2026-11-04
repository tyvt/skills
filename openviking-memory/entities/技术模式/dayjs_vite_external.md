# dayjs 作为 Vite 中的外部全局变量

在 `vite.config.js` 中，`dayjs` 被配置为外部全局变量（通过 CDN 注入），而不是 npm 依赖，导致导入错误。

## 描述
- `import dayjs from 'dayjs'` 触发 ESLint `import/no-unresolved` 报错。
- 应移除该 import 并直接使用全局 `dayjs`。

## 关系
- 受影响的文件：`综合查询/src/page-query/data-overview.vue`, `综合查询/src/api/query.js`, `zhi2-web-admin/src/views/publicQuery/assessment/index.vue`, `综合查询/src/page-query/components/StatisticsDeadline.vue`, `zhi2-web-admin/src/views/publicQuery/complex/index.vue`, `综合查询/src/utils/formatter.js`, `zhi2-web-admin/src/api/index.js`, `zhi2-web-admin/src/views/evaluation/surveyRelease/statistics/components/RangeTable.vue`.
- 来源: cursor 会话 808e7d2a-9e33-4f47-ab47-d07c4fa04826.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dayjs_vite_external",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 1,
  "memory_type": "entities"
}
-->