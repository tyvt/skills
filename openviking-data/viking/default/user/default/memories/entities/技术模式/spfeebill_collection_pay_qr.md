# spfeebill_collection_pay_qr
产品2.0 中 `collectionDialog.vue` 接入支付信息接口并完成二维码生成流程。

## 支付流程
- 点击「确定」→ `POST /property/spOrder/createFromBill` 创建订单。
- 若需扫码支付（`scanPayAmount > 0`）→ `POST /property/spOrder/payInfo`，参数 `{ orderId, payType: 'CSCANC' }`。
- 使用返回 `payData` 渲染二维码，展示订单号、过期时间。
- 轮询 `/property/onlinePay/queryOrderStatus` 检测支付结果。
- 若账户余额全额抵扣（无需扫码）→ 直接提示「收款成功」。

## 二维码弹窗增强
- 显示支付金额、订单号（`orderNo`）、有效期（`payExpireTime`）及支付提示说明。

## 涉及文件与归属
- 文件：`spFeeBill/components/collectionDialog.vue`（核心代码 397:432）、`bill/components/PaymentDialog.vue` 等
- 所属项目：产品2.0；来源会话：af2c138b-8a07-4a0c-9b27-adf12153be13；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "spfeebill_collection_pay_qr",
  "source_extraction_id": "0c68f37893bd423c9f021395ed8710bb",
  "version": 1,
  "memory_type": "entities"
}
-->
