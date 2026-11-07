# 项目交付审批附件应具有规范化的相对路径
在 Suzhou Real Estate Monitoring V3 项目中，项目交付的 `detail`/`approval` 接口增加了附件逻辑；`projectDeliveryConstants.js` 对 `approvalAttachment` 进行规范化。

## 规范化
- `projectDeliveryConstants.js` 添加 `normalizeApprovalAttachmentList` 等以规范化 `approvalAttachment`
- 提交加载由相对路径字符串组成的 `fileSite` 数组

## 对话框变更
- `ProjectDeliveryApprovalDialog.vue` 添加必填的 `FileUpload`（最多 10 个）
- `ProjectDeliveryDetail.vue` 和 `ProjectDeliveryInfoPanel.vue` 进行了调整

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f25b074f-2774-4b55-bbb6-fe05b1d2cad4
- 验证证据: src=苏州市房地产监测V3/071.md
- 涉及文件: doc frontend, 路由信息.json, 前端技术信息.md, xmjf.js, ProjectDeliveryApprovalDialog.vue, ProjectDeliveryDetail.vue, projectDeliveryConstants.js, ProjectDeliveryInfoPanel.vue
- 会话: f25b074f-2774-4b55-bbb6-fe05b1d2cad4; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "delivery_attach_norm",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->