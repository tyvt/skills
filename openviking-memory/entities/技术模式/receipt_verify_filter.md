# 核销收据明细列表过滤条件
园区物管2.0 的 zhi2-web-admin 在核销收据明细列表页 queryParams 增加 receiptVerifyFilter: 1，调用分页接口时自动带上该过滤参数。

## 实现要点
- queryParams 增加 receiptVerifyFilter: 1
- 列表请求通过 this.queryParams 展开参数
- 调用 /benefit/pubReceiptVerificationDetail/page 自动携带 receiptVerifyFilter=1

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailTable.vue
- 所属项目：园区物管2.0
- 来源会话：b331eedd-7085-47c5-8c87-81435ab799fb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_verify_filter",
  "source_extraction_id": "18bb029c698a48dcbda633e8f296ab54",
  "version": 1,
  "memory_type": "entities"
}
-->