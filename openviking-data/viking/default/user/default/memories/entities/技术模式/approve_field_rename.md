# 将审批字段 comment 重命名为 approveMessage
在 苏州市房地产监测V3 项目中，审批界面的“意见说明”字段已从 `comment` 统一为 `approveMessage`，以与预售主流程保持一致。

## 描述
- 在审批对话框和 e2e helpers 中调整字段命名
- 所属项目: 苏州市房地产监测V3

## 问题根因
- 字段 `comment` 未与预售主流程 (`approveMessage`) 对齐

## 解决方案
- 修改了 `src/views/presale/permitCancel/components/ApprovalDialog.vue`, `src/views/presale/permitExtend/components/ApprovalDialog.vue`, `src/views/presale/permit/components/PermitApprovalDialog.vue`
- 更新了 `e2e/fixtures/presale-cancel-helpers.js` 和 `e2e/fixtures/presale-extend-helpers.js` 中的断言

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：cf534ef4-25d6-4a32-b82b-358de4a68ed6
- 验证证据: src=苏州市房地产监测V3/232.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitCancel/components/ApprovalDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitExtend/components/ApprovalDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitApprovalDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/presale-cancel-helpers.js; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/presale-extend-helpers.js
- 源会话: cf534ef4-25d6-4a32-b82b-358de4a68ed6; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approve_field_rename",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 2,
  "memory_type": "entities"
}
-->