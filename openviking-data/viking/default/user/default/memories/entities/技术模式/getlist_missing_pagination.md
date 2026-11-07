# getList 缺失分页参数
园区物管2.0 中 getList 原先只拼 projectId 未带分页字段，与 zs-pagination 绑定的 queryParams 不一致导致翻页异常。

## 问题根因
- getList 仅拼 projectId，漏传 pageNum、pageSize 等分页字段。
- queryParams 缺少 leaseProjectId 初始字段，与 getQueryParams() 赋值不一致。

## 解决方案
- getList 改为通过 getQueryParams() 传参，带上 pageNum、pageSize、projectId、leaseProjectId（与同目录 leaseContract.vue 一致）。
- queryParams 补充 leaseProjectId 初始字段。
- 翻页或切换每页条数时，@pagination="getList" 会带上正确分页参数请求后端。

## 涉及信息
- 涉及文件：benefit/statisticsMap/rentIncomeExpense.vue、mixins/subTableMixins.js、leaseContract.vue
- 所属项目：园区物管2.0；来源会话：29f1c84f-97cf-49da-9e1a-a78cdde386a4；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getlist_missing_pagination",
  "source_extraction_id": "42c768a81b7349ffb7ae96dc2517af73",
  "version": 1,
  "memory_type": "entities"
}
-->
