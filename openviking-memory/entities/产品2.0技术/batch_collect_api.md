# 账单批量收款改走创建支付单
列表页收款从单选升级多选，统一调 spOrder/createFromBill 按账单数组生成支付单。

## 背景与目的
- 旧 /property/spFeeBill/collect 需下线，多笔收款本质是按账单 ID 数组生成一笔支付单
- 只有把类型、渠道、抵扣作为订单属性一次性提交，后端才能算实收并生成支付链接

## 解决方案
- 统一调 POST /property/spOrder/createFromBill（代理自动补 /v2.0 前缀）
- 请求体：billIds 数组（单笔多笔都传）、useDeduct='1'/'0'、paymentChannelId 仅扫码金额>0 时传
- payMode 由 channelType 换算（与 PaymentDialog 同套函数）、orderDesc 为备注
- 响应有 url 弹二维码轮询，无 url 直接提示成功并关弹窗

## 前置校验
- 所选单据都是待支付或部分支付、都是有效单据、属于同一物业管理区域，任一不满足拦截提示

## 验证与归属
- 来源会话 d093c203 给出参数映射表并说明旧 collect 已移除，诉求多选收款并校验
- 涉及文件：zhi2-web-admin/src/views/property/spFeeBill
- 所属项目：产品2.0；代码基线：a5e7e78

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "batch_collect_api",
  "source_extraction_id": "023be684d29240b38dd4e584c076013b",
  "version": 1,
  "memory_type": "entities"
}
-->