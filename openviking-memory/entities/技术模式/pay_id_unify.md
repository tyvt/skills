# 统一支付链中的订单ID
整个支付链必须使用由 `createFromBill` 返回的订单ID，通过 `POST /property/spOrder/payInfo` 请求二维码，在对话框中展示，并对 `queryOrderStatus` 进行轮询，替换由 `payInfo` 返回的 `orderNo` 以避免ID不一致。

## 上下文
- 支付链在轮询中使用了来自 `payInfo` 的 `orderNo`，导致ID不一致
- `createFromBill` 是订单ID的权威来源

## 解决方案
- 在 `payInfo`、对话框展示和 `queryOrderStatus` 中使用 `createFromBill` 的ID
- 替换由 `payInfo` 返回的 `orderNo`

## 验证与归属
- 涉及文件: spFeeBill/components/collectionDialog.vue, spFeeBill/components/index.vue, bill/components/PaymentDialog.vue, spFeeBill/components/enums.js
- 所属项目: 产品2.0; 来源: 035.md; 会话: 22489706-6592-40f4-b567-7d65ec1e013f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pay_id_unify",
  "source_extraction_id": "48b19525c64140a5b949b1bdad141457",
  "version": 1,
  "memory_type": "entities"
}
-->