# 账户选择弹窗未复用 zs-select-dialog
accountNameDialog.vue 使用了自定义的 zs-dialog+zs-table，与 zs-select-dialog 标准不一致。

## 描述
- accountNameDialog.vue 使用 zs-dialog 和 zs-table 实现了自有旧样式。
- 与 zs-select-dialog 在外观和交互上不一致。

## 解决方案
- 内部复用了 zs-select-dialog 以统一样式。
- 规范了行高、无边框、搜索表单、分页以及单选/多选。

## 文件
- zhi2-web-admin/src/views/maintenance/accountSplit/detail.vue
- zhi2-web-admin/src/views/maintenance/accountSplit/components/accountNameDialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/SKILL.md
- zhi2-web-admin/src/views/maintenance/accountSplit/components/AccountListTable.vue
- zhi2-web-admin/src/views/maintenance/accountCancel/components/ChangeApplyDialog.vue
- zhi2-web-admin/src/views/maintenance/depositNotice/components/AccountDetailDialog.vue

## 关系
- 会话来源: c7c58078-a865-450f-bba0-bff68effa3c3 (cursor)
- 所属项目: 产品 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_dialog_no_reuse",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->