# 企业基本信息审核流程查看修复
已修复企业基本信息「审核流程查看」按钮缺失，并补上审核抽屉的数据 ID 传递。

## 修改内容
- `DeveloperBasicInfoDetail.vue` 新增 `auditFlowBusCode`（有 `activeChangeId` 时用 `CHANGE_FLOW_BUS_CODE`/`qybgxq`）、`auditFlowDataId`、`showAuditFlowBtn`
- 在 `operation-btn-group` 上绑定 `:bus-code`、`:id`、`:show-audit`，并加 `form-mode-override="view"`，避免路由 `formMode=edit` 时误隐藏按钮
- `attachmentDraw.vue` 审核 Tab 的 `ApprovalProcess` 增加 `:data-id="id"` 与 `:key`，使无 URL 主键的企业基本信息页能按变更单 ID 拉取

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`DeveloperBasicInfoDetail.vue`、`attachmentDraw.vue`、`company-record-change.spec.js` 等
- 来源会话：f4b1901e-bda0-4bcf-8527-c06dcde62f23
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_flow_fix",
  "source_extraction_id": "31186a8f7ee640d1ae7c16b5a1e5ae2a",
  "version": 1,
  "memory_type": "entities"
}
-->