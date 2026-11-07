# houseLimit接口返回data嵌套致表格空白
`/building/houseLimit/page` 等接口实际返回 `{code,msg,data}` 且列表藏于 `data`，原 `res.rows`/`res.total` 取数 undefined 致表格空白，改用共享解析兼容嵌套结构。

## 问题根因
- `/building/houseLimit/page` 等接口实际返回 `{code,msg,data}`，列表藏于 `data`
- 原 `res.rows`/`res.total` 取数 undefined 导致表格空白

## 关键修复
- `detail.vue` 的 `loadRecords()` 改用共享解析 `parseHouseLimitPageResult(res)` 兼容嵌套结构

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/148.md
- 涉及文件：detail.vue、houseLimitConstants.js、LimitRecordSelectDialog.vue、main.js、api/index.js、utils/request.js、e2e/building/house-limit-real-api-flow.spec.js、playwright.config.js
- 所属项目：苏州市房地产监测V3；来源会话：a5b234e2-7ed5-4ce3-a362-c4c694f6b33c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_limit_data_nested",
  "source_extraction_id": "0d247d953872400cb8867fd2a9de659d",
  "version": 1,
  "memory_type": "entities"
}
-->