# 台账详情页complexId优先致查询无数据
台账详情页因 commit 5d50941f2 将 ID 优先级改为 complexId 优先，而 standingBook 路径参数历史使用 projectId || leaseProjectId，导致 200 空数据。

## 问题根因
- commit `5d50941f2` 将 ID 优先级改为 `complexId` 优先
- standingBook 路径参数历史使用 `projectId || leaseProjectId`
- 台账接口传参错误导致返回 200 但无数据

## 修复方案
- 修复需确保台账接口传参沿用 `projectId || leaseProjectId` 而非 `complexId`
- 避免 200 空数据问题

## 验证与归属
- 验证证据：src=苏住房G/034.md
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、statisticsMapDetail/index.vue、operatingAssets.vue、overviewContent.vue、leaseContract.vue、rentIncomeExpense.vue、utils/request/index.js、vite.config.js
- 所属项目：苏住房G；来源会话ID：5aabb73b-5e1d-4042-9c52-01a66874380d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "standingbook_complexid_bug",
  "source_extraction_id": "a81b0be46c114c94bdf5b0efa2e5f31f",
  "version": 1,
  "memory_type": "entities"
}
-->