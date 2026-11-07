# 银行划拨记录标题重复因双层Headline
苏州市房地产监测V3 中 supervision/agreement/allocation/detail.vue 因内外双层 Headline 导致标题“明细”重复，已移除外层并指定内表标题。

## 问题根因
- `supervision/agreement/allocation/detail.vue` 外层 `Headline` 与内部 `TransactionDetailTable` 默认 `Headline` 冲突致重复标题“明细”

## 解决方案
- 移除外层 `Headline`
- 对 `TransactionDetailTable` 设 `title-text="银行划拨记录"` 单独展示

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/309.md
- 涉及文件：路由信息.json、allocation/detail.vue、deposit/notice/components/TransactionDetailTable.vue、unblock/notice/detail.vue、deposit/notice/detail.vue、deposit/refund/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：e0321177-40d5-4630-9630-017d718101c0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allocation_headline_duplicate",
  "source_extraction_id": "2080a0baaff942c089970729ab9937c9",
  "version": 1,
  "memory_type": "entities"
}
-->