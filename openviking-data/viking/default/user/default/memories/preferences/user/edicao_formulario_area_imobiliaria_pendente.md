---
audit_status: valid
last_checked: 2026-11-27T21:56:52+08:00
verdict_note: bTerminalProjectMixin.js 与 benefit/complex/detail.vue 存在，isDisabled 中 bizState 校验属实
---
- 在 zhi2-web-admin/src/views/property/complex/detail.vue, 在 computed isDisabled 中, 在 role 之前添加 bizState 验证：若 formMode 为 'add' 或 bizState 为 0/空，返回 false（允许编辑）。
- G-end 和 B-end 管理员可编辑；B-end 专业人员在关联后锁定关键字段。
- 验证证据: src=苏住房G/066.md; 涉及文件: detail.vue, bTerminalProjectMixin.js, detailMixins.js, getters.js, form.js, index.vue, terminalUser.js, OperationBtnGroup/index.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 房地产区域表单编辑待处理",
  "source_extraction_id": "9afaba5dc1ac4c14af44db9460e5cd8b",
  "version": 1,
  "memory_type": "preferences"
}
-->