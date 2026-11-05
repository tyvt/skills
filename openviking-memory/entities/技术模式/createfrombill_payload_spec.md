# createFromBill 请求体参数规范
`createFromBill` 接口按文档仅应传以下参数，当前代码已实现一致。

## 参数清单
- `billIds`：选中账单 ID 列表
- `useDeduct`：是否使用抵扣（由 `form.useBalance` 决定 '1'/'0'）
- `paymentChannelId`：需要扫码时传入
- `payMode`：支付模式
- `orderDesc`：备注（来自 `form.remark`）

## 实现位置
- `buildCreateOrderPayload()` 位于 `zhi2-web-admin/src/views/property/spFeeBill/components/collectionDialog.vue` 第 399-410 行
- 当 `needSelectPaymentChannel` 且 `form.paymentChannelId` 存在时，附加 `paymentChannelId`（经 `getSelectedChannel()` 取值）

## 验证与归属
- 验证证据：extracted source=cursor session=ff1c31d0-1595-44b3-95e1-129dad1f7eae
- 涉及文件：collectionDialog.vue、PaymentDialog.vue、utils/request.js
- 项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "createfrombill_payload_spec",
  "source_extraction_id": "9f333107872e469e979c4d40d93df257",
  "version": 1,
  "memory_type": "entities"
}
-->