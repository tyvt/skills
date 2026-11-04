
# 收银台支付方式仅出银联支付因接口调用错误
员工端收银台弹层仅显示「银联支付」一种支付方式，根因是员工端与业主端调用了不同的支付渠道接口。
## 问题根因
- 员工端调 `GET /system/paymentChannel/list`，业主端同场景调 `POST /system/paymentChannel/listPayablePaymentChannel`。
- 员工端应调与业主端一致的 `listPayablePaymentChannel` 接口，错误调用导致仅返回「银联支付」。
## 解决方案
- 员工端改为调用 `POST /system/paymentChannel/listPayablePaymentChannel` 获取可用支付方式。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/staff/api/cashier.js、src/api/system.js、src/staff/pages/cashier/result.vue
- 来源会话ID：54c23926-7b8a-40d1-a6aa-2e3dcc903484
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashier_payment_channel_api",
  "source_extraction_id": "628e445ead5342fe8e8a0f3c75869f07",
  "version": 1,
  "memory_type": "entities"
}
-->