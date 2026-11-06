# 预售许可证审批弹窗标题修复
苏州市房地产监测V3 项目中修复预售许可审批弹窗（`PermitApprovalDialog.vue`）标题重复「审批」的问题，改为直接使用节点标签。
## 问题原因
- 弹窗标题原用 `${nodeLabel}审批`，而 `detail.vue` 传入的 `nodeLabel` 已是「初审审批」，拼接后变成「初审审批审批」；终审等节点同理
## 修改内容
- 弹窗标题改为直接使用 `nodeLabel`，与按钮文案一致；如 `dialogTitle() { return this.isAccept ? '受理' : this.nodeLabel }`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`PermitApprovalDialog.vue`、`detail.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：f2ccc9f2-b2d8-4dc7-97a0-92473b2a178b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_title_fix",
  "source_extraction_id": "304d2d75b409484e82e286701584b3b9",
  "version": 1,
  "memory_type": "entities"
}
-->