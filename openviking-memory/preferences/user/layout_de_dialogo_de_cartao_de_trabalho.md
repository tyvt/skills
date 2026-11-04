- `InfoCardDialog.vue` 和 `WorkCardDialog.vue` 应使用居中 flex 容器，字段标签固定为 5.5em 宽且右对齐，卡片 `max-width:100%` 并水平居中。
- 根本原因：`vue-qr` 默认在 `:size="50"` 时有 `margin=20`，导致过多的空白边距，且容器中的 `padding:4px` 加剧了该问题；标签宽度不一致且缺乏宽度限制。
- QR 修正：`WorkCardDialog.vue` 和 `InfoCardDialog.vue` 添加 `:margin="0"` 和 `:white-margin="false"`；移除 `.work-card__qr-wrap`/`.info-card__qr-wrap` 的 `padding`，固定为 `50×50px` 以符合设计。
- 涉及文件：`AgencyPersonnelDetail.vue`、`WorkCardDialog.vue`、`InfoCardDialog.vue`、`AgencyPersonnelList.vue`、`QrCodeDialog.vue`、`qrCode.vue`、`agency-personnel-real-api-flow.spec.js`、`CashsaleDetail.vue`、`CashsaleInfoPanel.vue`、`RecordCertificateDialog.vue`。
- 验证证据: src=苏州市房地产监测V3-leftover/038.md; 会话: 3bb79189-7e5a-4f02-909b-f9bdf9a2ecb3; 另 src=苏州市房地产监测V3-rest/113.md; 会话: 271fe773-92e0-4ead-a113-8889fcea1743; 所属项目: 苏州市房地产监测V3.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 工作卡片对话框布局",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 2,
  "memory_type": "preferences"
}
-->
