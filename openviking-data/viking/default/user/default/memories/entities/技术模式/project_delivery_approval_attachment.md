# 交付备案审批附件接口改造
苏州市房地产监测V3 项目交付备案 detail/approval 接口变更已按计划完成对接。
## 变更内容
- projectDeliveryConstants.js 新增 normalizeApprovalAttachmentList、mapApprovalAttachmentViewItems、collectApprovalAttachmentPaths
- normalizeProjectDeliveryDetail 增加 approvalAttachment 归一化
- ProjectDeliveryApprovalDialog.vue 增加「审批附件」FileUpload（必填，最多 10 个）
- 提交时携带 approvalAttachment: string[]（fileSite 相对路径）
- 增加 data-testid 属性（原文截断，以实际代码为准）
## 涉及文件与归属
- zhi2-web-admin/src/views/supervision/projectDelivery/projectDeliveryConstants.js
- zhi2-web-admin/src/views/supervision/projectDelivery/components/ProjectDeliveryApprovalDialog.vue
- zhi2-web-admin/src/views/supervision/projectDelivery/components/ProjectDeliveryInfoPanel.vue
- zhi2-web-admin/src/views/supervision/projectDelivery/components/ProjectDeliveryDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：f25b074f-2774-4b55-bbb6-fe05b1d2cad4；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_delivery_approval_attachment",
  "source_extraction_id": "f5ca0326c543440ba2dbc7a77ff0f348",
  "version": 1,
  "memory_type": "entities"
}
-->
