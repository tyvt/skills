# externalWebview queryParams 优先回退 profileData
externalWebview 的 resolvePageByProfile 中 phone/certificateNumber/realName 优先取 queryParams，缺失回退 profileData 并清洗脏值。

## 逻辑规则
- `pages/webview/externalWebview.vue` 的 `resolvePageByProfile` 中 `phone`/`certificateNumber`/`realName` 优先取 `queryParams`
- 缺失时回退 `profileData` 并清洗 `"无"`/`"null"` 脏值

## 验证与归属
- 验证证据：extracted source=cursor session=b1e7f4c2-a06b-4b9b-8c59-0da702b1c55f
- 涉及文件：pages/webview/externalWebview.vue
- 来源会话ID：b1e7f4c2-a06b-4b9b-8c59-0da702b1c55f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "externalwebview_query_params_fallback",
  "source_extraction_id": "a915952323c7436887ace9fedf19adbf",
  "version": 1,
  "memory_type": "entities"
}
-->