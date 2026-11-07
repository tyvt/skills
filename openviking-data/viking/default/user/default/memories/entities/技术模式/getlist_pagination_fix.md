# getList缺分页参数致分页失效
园区物管2.0 多个列表页 getList 原仅拼接 projectId 未带分页字段，导致与 zs-pagination 绑定不一致。

## 问题根因
- getList 仅拼接 projectId，未携带 pageNum/pageSize
- 与 zs-pagination 绑定的分页参数不一致，分页失效

## 解决方案
- 改为通过 getQueryParams() 传参
- 补充 queryParams.leaseProjectId
- @pagination 触发时携带正确分页参数

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证证据：会话 29f1c84f-97cf-49da-9e1a-a78cdde386a4
- 涉及文件：src/views/benefit/statisticsMap/rentIncomeExpense.vue、src/mixins/subTableMixins.js、src/mixins/table.js、src/views/benefit/pubHouse/components/assetPositionSubTable.vue、src/views/benefit/statisticsMap/overviewContent.vue、src/views/benefit/statisticsMap/leaseContract.vue、src/views/home/components/TodoTable.vue
- 所属项目：园区物管2.0；来源会话ID：29f1c84f-97cf-49da-9e1a-a78cdde386a4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getlist_pagination_fix",
  "source_extraction_id": "6979dc0db6524b59bb6a0c5f048888aa",
  "version": 1,
  "memory_type": "entities"
}
-->