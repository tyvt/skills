# fee_declare_submit_edit_only
在 feeDeclare2/detail.vue 中，提交按钮应由 formMode 控制，而不是由旧逻辑控制。

## 上下文
- detail.vue 文件移除了 forceShowSubmit 并添加了 :showSubmit="formMode != 'edit'" 以在编辑模式下隐藏提交。
- OperationBtnGroup 恢复原始逻辑：仅在查看模式且 bizState == 0 时显示提交。

## 文件与来源
- 涉及文件: property/feeDeclare2/detail.vue, index.vue, components/OperationBtnGroup/index.vue, mixins/detailMixins.js, form.js, declare/components/detail.vue, main.js, ZsSubmit/index.vue.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/052.md; 会话: 9ce5c9a2-4e7d-41cf-bb2c-201ef6f68770.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_declare_submit_edit_only",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "entities"
}
-->