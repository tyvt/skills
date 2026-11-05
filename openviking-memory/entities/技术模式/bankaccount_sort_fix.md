# 银行明细默认排序参数修复
无锡市区G 子模块 zhi2-web-admin 的账户详情银行明细表格默认排序错误，需改为按查询时间倒序。

## 问题根因
- `BankAccountTable.vue` 中 `queryParams` 默认 `orderBy: 'bankAccountBalance'`、`sort: 'desc'`，导致表格按余额排序。

## 解决方案
- 将默认排序改为 `orderBy: 'queryTime'`、`sort: 'desc'`，与后端接口 `v2.0/benefit/pubBankAccountQueryRecord/pageCommon` 默认一致。
- 改动位于 `zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/components/BankAccountTable.vue` 第 95 行附近。

## 验证与归属
- 验证：`vite build` 构建通过（version 2.6.1，gitBranch fix/bug6056-bankaccount-sort）。
- 涉及文件：BankAccountTable.vue；子模块分支 develop/v2.6.1 提交 1d8cce9ed，父仓库 gitlink 提交 207a386。
- 所属项目：无锡市区G / zhi2-web-admin；来源会话：2026-11-05 禅道 bug 6056 修复。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bankaccount_sort_fix",
  "source_extraction_id": "62f6bfc8b7284953b345df46affde8c3",
  "version": 1,
  "memory_type": "entities"
}
-->