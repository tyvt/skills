# 合同缴款详情标题样式修复
苏州市房地产监测V3 中合同缴款详情页移除多余 Tab 小标题，统一使用 Headline 区块标题。

## 修改说明
- 文件：zhi2-web-admin/src/views/supervision/deposit/notice/detail.vue
- 合同缴款（CONTRACT_PAYMENT_NOTE）不再用仅一个「交易明细」的 zs-tabs，改为直接渲染 TransactionDetailTable 并设置 title-text="交易明细"
- 定金缴款（DEPOSIT_PAYMENT_NOTE）保留「买受人/交易明细」两个 Tab，交易明细 Tab 内显式使用 title-text="交易明细"
- 合同缴款明细表增加 :key="form.noticeId || form.payNoticeNo" 避免保存/审批后列表不刷新

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/supervision/deposit/notice/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：5ca0966e-9f94-442a-8226-30d415bceedb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_notice_title_style",
  "source_extraction_id": "532c5184418545dea132530ce12ccb1a",
  "version": 1,
  "memory_type": "entities"
}
-->