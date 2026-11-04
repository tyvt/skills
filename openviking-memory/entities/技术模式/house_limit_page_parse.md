# 楼栋限价表格接口结构解析修复
苏州市房地产监测V3 中 `/building/houseLimit/page` 与 `pageHouseLimitAll` 接口返回 `{ code, msg, data }`（列表在 `data` 中），原硬取 `res.rows`/`res.total` 导致表格空白。

## 问题根因
- `/building/project/page` 返回 `{ total, rows, code, msg, summary }`（顶层 rows ✅）
- `/building/houseLimit/page` 与 `pageHouseLimitAll` 返回 `{ code, msg, data }`，列表包在 `data` 中（YApi 文档画的 `rows/total` 不实）
- 原写法 `res.rows`/`res.total` 取到 `undefined`，表格空白；屋列表兼容解析只认顶层/一层 `data` 同样漏掉

## 修复要点
- `houseLimit/detail.vue` 的 `loadRecords()` 改用共享解析 `parseHouseLimitPageResult(res)`（原硬取 `res.rows`/`res.total`）
- `houseLimitConstants.js` 同步调整

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/building/houseLimit/detail.vue、zhi2-web-admin/src/views/building/houseLimit/houseLimitConstants.js
- 所属项目：苏州市房地产监测V3；来源会话ID：a5b234e2-7ed5-4ce3-a362-c4c694f6b33c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_limit_page_parse",
  "source_extraction_id": "6e905a64a52f47dcb6f6e7f89e7320b7",
  "version": 1,
  "memory_type": "entities"
}
-->