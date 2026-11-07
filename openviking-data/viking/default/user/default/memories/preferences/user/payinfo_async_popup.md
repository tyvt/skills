- When an order is created, immediately pop up the scan-code dialog to show order info, then request payInfo from the third-party interface asynchronously in the background to avoid blocking on slow responses.
- On payInfo success, display the QR code and start polling; on failure, show a refresh button to re-call payInfo (stop polling first).
- Configure the payInfo request with noMessage: true to avoid duplicate prompts with the dialog's own messages.
- Involved files: zhi2-web-admin/src/views/property/spFeeBill/components/collectionDialog.vue, PaymentDialog.vue, spFeeBill/components/index.vue; evidence: src=产品2.0/055.md; session: ba1c8c6a-7b49-465a-aab9-2c949eb85f07.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：ba1c8c6a-7b49-465a-aab9-2c949eb85f07


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "payinfo_async_popup",
  "source_extraction_id": "e7c605a5c99a41d8ac71682f2e3b63a6",
  "version": 1,
  "memory_type": "preferences"
}
-->
