# 监管账户资金调拨详情重复标题修复
苏州市房地产监测V3「监管账户资金调拨」详情页「银行划拨记录」区块重复标题已修复。

## 问题原因
- `detail.vue` 外层用 `Headline`，内部 `TransactionDetailTable` 又自带 `Headline`（默认 `titleText` 为「明细」），造成重复标题

## 修改内容
- 去掉外层 `Headline`，由 `TransactionDetailTable` 单独展示
- 设置 `title-text="银行划拨记录"`，刷新后只保留「银行划拨记录」一条分区标题

## 涉及文件
- `zhi2-web-admin/src/views/supervision/agreement/allocation/detail.vue`
- `zhi2-web-admin/src/views/supervision/deposit/notice/components/TransactionDetailTable.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：e0321177-40d5-4630-9630-017d718101c0
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allocation_headline_fix",
  "source_extraction_id": "b73fb50eba434aa79e3d0fcfb2358295",
  "version": 1,
  "memory_type": "entities"
}
-->