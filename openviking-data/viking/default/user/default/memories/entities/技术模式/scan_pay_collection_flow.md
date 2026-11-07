# 扫码收款链路固定时序约定
产品2.0 阳光物业账单收款扫码支付须按 createFromBill → payInfo(CSCANC) → 轮询 queryOrderStatus 固定时序串接。

## 支付通道
- payType 决定后端走哪条支付通道：CSCANC=银联C扫B 返回二维码 payData；MINIPROGRAM 返回 miniPayRequest

## 固定流程
- 1) POST /property/spOrder/createFromBill 创建订单
- 2) 若 scanPayAmount>0，POST /property/spOrder/payInfo，参数 { orderId, payType: 'CSCANC' }，取返回 payData 作二维码内容，回显 orderNo、payExpireTime（有效期）
- 3) 轮询 /property/onlinePay/queryOrderStatus 检测支付结果
- 4) 若账户余额全额抵扣（无需扫码）直接提示收款成功，不进二维码分支；payData 为空按失败提示，不放出二维码弹窗

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：053.md 会话 af2c138b 的 collectionDialog.vue 最终结论给出 fetchPayInfo/showQrCode/handleConfirm 核心代码与五步支付流程
- 涉及文件：property/spFeeBill/components/collectionDialog.vue、property/bill/components/PaymentDialog.vue
- 所属项目：产品2.0；来源会话：af2c138b-8a07-4a0c-9b27-adf12153be13；代码基线：6accf9a/0ec4b79/bca8b74/2f68042/94b86fa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scan_pay_collection_flow",
  "source_extraction_id": "0484b9296d2e4e3da6a631e0d03fa14f",
  "version": 1,
  "memory_type": "entities"
}
-->