# 物业管理区域查询接口参数事实
苏住房G 项目 zhi2-web-admin 中物业管理区域查询（publicQuery/complex）实际接口与常见假设不同，且曾出现分页异常已修复。
## 关键事实
- 普通查询（未使用高级筛选）：GET /property/complex/page
- 高级筛选场景：POST /property/complex/pageNew
- 分页参数：pageNum / pageSize（曾因所有请求误走 pageNew 导致返回 pageSize:10 但实际 list 仅 1 条，已改回按场景选接口修复）
- 物业类型参数：propertyTypes（逗号分隔，非 regionType）
- publicQuery/complex/index.vue 曾误调用 pageNew 接口（apiSuffix 为 pageNew 且 apiMethod 为 post），导致选择物业类型查询时返回「请求参数格式错误或类型不匹配」；已修复为 apiSuffix 改回 page、移除 apiMethod 恢复默认 GET，与同目录其他公共查询页（如物业服务企业查询）一致。修复原因：前端将 propertyTypes 数组转逗号分隔字符串，pageNew 对 POST 请求体参数格式要求不同，而 /page 接口已支持该格式。
## 涉及文件
- src/views/publicQuery/complex/index.vue
- src/views/publicQuery/complex/detail.vue
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话ID：2cb7e5ce-53e5-4fe3-a1f6-1bf1a8a4dc95、8bdf9717-be50-4471-8d56-923d2b2d1c5a、bf7f3ae9-344b-43b9-80b5-84d289e806ae；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_query_api_param",
  "source_extraction_id": "35152ab6f89644c1b5de7b32d547e962",
  "version": 3,
  "memory_type": "entities"
}
-->