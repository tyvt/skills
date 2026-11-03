# 慢三方支付接口交互套路
收款/支付弹窗依赖慢三方接口生成二维码时，改为「先弹窗占位、异步拉取、失败可刷新」三段式避免用户无反馈。

## 问题根因
- 原流程「创建订单 → 等三方返回 → 才弹窗」，用户长时间面对无反馈
- 收款/支付弹窗依赖三方接口（如 property/spOrder/payInfo）生成二维码，该接口可能较慢

## 解决方案
- 创建订单后立即弹出扫码窗并展示订单号、金额
- 后台异步请求 payInfo，请求中显示 loading 与「正在生成支付二维码...」占位文案
- 成功后展示二维码并开始轮询支付状态
- 失败时二维码区域显示错误提示并提供「刷新」按钮重调 payInfo，刷新前先停止轮询，成功后再展示二维码并恢复轮询
- payInfo 请求带 noMessage: true，避免全局错误 toast 与弹窗内错误提示重复
- 套路适用于所有慢三方接口的前置展示场景：弹窗先给确定信息，慢数据异步补齐，失败留手动重试入口

## 验证与归属
- 立即弹扫码窗显示订单号金额 → 异步请求 payInfo → 成功展示二维码并轮询；失败区显示提示+刷新按钮，刷新先停轮询再恢复；payInfo 用 noMessage:true 防提示重复
- 涉及文件：zhi2-web-admin/src/views/property/spFeeBill/components/collectionDialog.vue、zhi2-web-admin/src/views/property/bill/components/PaymentDialog.vue
- 所属项目：产品2.0；代码基线：6accf9a；来源会话：ba1c8c6a-7b49-465a-aab9-2c949eb85f07

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "slow_pay_qrcode",
  "source_extraction_id": "339530474fdc41989e139e610acb727b",
  "version": 1,
  "memory_type": "entities"
}
-->