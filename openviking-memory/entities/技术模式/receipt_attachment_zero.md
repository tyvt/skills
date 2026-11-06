# 回单核销附件删除后显示0修复
园区公共收益项目修复 `pubVerificationReceipts/detail.vue` 删除凭证附件保存后页面显示可点击「0」的问题。

## 问题原因
- 删除附件时 `handleVoucherFileChange` 在文件列表为空时直接 `return`，仅清空 `voucherFileUrl`，`voucherFileId` 仍保留原值
- 保存后后端返回 `voucherFileId: 0`，查看模式用 `voucherFileUrl || voucherFileId` 展示，URL 为空回退到 `0` 被当附件路径

## 修复内容
- 删除附件时同时清空 `voucherFileUrl` 和 `voucherFileId`
- 保存时无附件 URL 时显式传 `voucherFileId: null` 通知后端清除
- 加载详情后 `normalizeVoucherAttachment()` 规范化字段，避免 `0` 被当作有效附件
- 查看模式凭证附件仅展示 `voucherFileUrl`，不再用 `voucherFileId` 兜底

## 验证与归属
- 所属项目：园区公共收益；来源会话：19c456b4-3996-489a-b606-804a1309acf5；代码基线：none
- 涉及文件：`pubVerificationReceipts/detail.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_attachment_zero",
  "source_extraction_id": "f06685698d72453c94065c8385271862",
  "version": 1,
  "memory_type": "entities"
}
-->