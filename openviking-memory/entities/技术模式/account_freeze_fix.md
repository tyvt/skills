# 冻结原因手动输入下拉多出选项修复
苏住房G 项目修复 AccountFreezeFields 组件因 allow-create 导致历史手动输入原因变为下拉选项的问题。

## 问题根因
- el-select 开启 allow-create，历史手动输入（如「额度与无业务」）且不在预设列表时，Element UI 自动加到下拉第一项

## 修复内容
- 在 AccountFreezeFields.vue 移除 allow-create、default-first-option、filterable
- 下拉仅保留预设三项：多次输入错误密码、管理员手动冻结、其他
- 移除 onFreezeReasonSelect 中对「其他」的特殊处理（选中后切手动输入并清空已选值），使「其他」作为预设选项正常选中；仅点击「手工输入」才切换文本输入框（来源会话 d80e5a47-d726-4c05-bb4a-d5ce5d209b4b）
- 历史自定义原因仍显示在输入框，但不再作为下拉选项

## 验证与归属
- 所属项目：苏住房G；来源会话：cbb5f1e2-ec0c-4fd3-8323-b22f7cdd9fa6、d80e5a47-d726-4c05-bb4a-d5ce5d209b4b
- 涉及文件：AccountFreezeFields.vue、accountFreeze.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_freeze_fix",
  "source_extraction_id": "b658824e88774344b10a90357779d9e4",
  "version": 2,
  "memory_type": "entities"
}
-->