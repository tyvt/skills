# 年度预算数据解析为空修复
苏住房C小程序年度预算页因响应解析错误导致「暂无相关数据」，已修复。

## 问题根因
- `resolveBudgetResponse` 按 `noReject: true` 时的原始 `uni.request` 响应解析，期望结构为 `response.data.data`
- `getAnnualBudgetByComplexId` 未传 `{ noReject: true }` 给 `api.get`，拦截器实际返回 `{ code: 200, msg, data: [...] }`
- 因此 `response.data` 已是预算数组，`response.data.data` 为 `undefined`，`budgetDataList` 被赋值为 `[]`

## 修复内容
- 删除 `resolveBudgetResponse`，改为项目通用写法 `budgetRes?.data || []`
- 加载后若当前年份（如 2026）无数据，自动切换到接口返回的最新年份（如 2025）

## 涉及文件与归属
- 涉及文件：src/pages_benefit/budget/index.vue、src/api/benefit.js、src/api/index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：ad82d807-c9eb-4693-a967-eec366f6e641

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "budget_response_fix",
  "source_extraction_id": "aac1b2384e6740f491121840123bb125",
  "version": 1,
  "memory_type": "entities"
}
-->