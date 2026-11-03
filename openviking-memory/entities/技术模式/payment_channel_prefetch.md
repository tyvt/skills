# 弹窗预拉渠道查询误读创单请求体
产品2.0的zhi2-web-admin中，spFeeBill弹窗打开即预拉listPayablePaymentChannel，其报文被误认为创单createFromBill多了查询条件。

## 根因
- 渠道查询报文带businessId/hasStudy/hasVerify，用户误当作创单payload
- 弹窗无条件发起查询，即使scanPayAmount=0不需扫码，叠加旧构建缓存显得参数未清

## 解决方案
- 仅scanPayAmount>0时才调渠道接口，否则不发请求
- 同业务多弹窗查同一接口时参数集逐字段对齐，删掉只在一边出现的hasVerify等字段
- 创单接口严格只传文档字段（billIds/useDeduct/orderDesc，需扫码加paymentChannelId/payMode）
- 排查时先按URL区分接口再怀疑代码，不混改buildXxxPayload

## 验证与归属
- 验证证据：会话ff1c31d0用户贴图问查询条件还在，结论为渠道查询非创单
- 涉及文件：property/spFeeBill/components/collectionDialog.vue、property/bill/components/PaymentDialog.vue、utils/request.js
- 所属项目：产品2.0；来源会话：ff1c31d0-1595-44b3-95e1-129dad1f7eae；代码基线：6accf9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_channel_prefetch",
  "source_extraction_id": "67b23d034f0041818d5b4edc1485c979",
  "version": 1,
  "memory_type": "entities"
}
-->