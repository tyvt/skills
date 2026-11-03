# 资金调拨详情外层Headline标题重复
苏州市房地产监测V3 中 allocation/detail.vue 等页面的外层 Headline 与 TransactionDetailTable 内置默认标题"明细"重复，需移除外层标题改用表格标题。

## 问题根因
- `allocation/detail.vue` 外层 `Headline` 与 `TransactionDetailTable` 内置默认标题"明细"重复
- 同类页面 `unblock/notice/detail.vue`、`deposit/notice/detail.vue`、`deposit/refund/detail.vue` 存在相同结构

## 解决方案
- 移除外层 `Headline`，设表格 `title-text="银行划拨记录"` 实现单一分区标题
- 仅依赖表格内置标题，避免双层标题冗余

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/109.md
- 涉及文件：allocation/detail.vue、TransactionDetailTable.vue、unblock/notice/detail.vue、deposit/notice/detail.vue、deposit/refund/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：e0321177-40d5-4630-9630-017d718101c0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allocation_headline_overlap",
  "source_extraction_id": "c7a7f46ab8b2402891ec68878f84c6aa",
  "version": 1,
  "memory_type": "entities"
}
-->