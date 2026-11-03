# 支付状态轮询改用订单详情
物业收费/账单收款弹窗轮询支付完成时，禁用不存在的 /queryOrderStatus，改为查订单详情接口取 payState 判定已支付。

## 问题现象
- 收款弹窗轮询调用 /property/onlinePay/queryOrderStatus?orderNo=xxx，接口 404
- 支付成功后弹窗永不自动关闭，用户需手动操作

## 根因分析
- 该查询接口在后端不存在（用户明确指出应直接查订单详情获取支付状态）
- 订单支付状态的权威来源是订单详情本身，订单详情页一直用 spOrder/detail 获取
- 前端若只用 queryOrderStatus 会因 404 永远拿不到支付完成信号

## 解决方案
- 轮询改为 GET /property/spOrder/{orderId}（订单详情），取 payState 字段判定
- payState === '1' 或 1 即已支付——后端可能返回字符串或数字，两种都判
- 定时器统一在 startPolling/stopPolling 管理：启动先 stopPolling 防重复；orderId 先 String() 归一后闭包捕获
- 轮询异常直接吞掉继续下一轮，不弹提示；支付成功分支先 stopPolling 再弹 message 与关弹窗；间隔 3s

## 验证与归属
- 会话 89a522be 结论：轮询改 GET /property/spOrder/{orderId}，与 OrderDetailDialog/spOrder/detail 用法一致
- 涉及文件：spFeeBill/components/collectionDialog.vue、bill/components/PaymentDialog.vue、spFeeBill/components/index.vue
- 所属项目：产品2.0；来源会话：89a522be-d7a1-4f44-b621-919cfb27dfd4；代码基线：6accf9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pay_poll_order_detail",
  "source_extraction_id": "4a0d09f28e58446e8eec2d811704c187",
  "version": 1,
  "memory_type": "entities"
}
-->