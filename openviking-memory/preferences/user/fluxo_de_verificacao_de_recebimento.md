- 在验证流程中，仅通过 `POST /benefit/pubReceiptVerification` 发送 `{ receiptDetailId }`，并使用返回的 `receiptVerificationId` 以 `formMode:'view'` 打开详情。
- 如果已存在验证，直接跳转到详情；移除 `buildReceiptVerificationPayload` 和借贷方向逻辑。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 接收验证流程",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "preferences"
}
-->
