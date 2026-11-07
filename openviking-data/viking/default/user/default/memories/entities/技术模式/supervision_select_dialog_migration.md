# 监管模块选择弹窗函数化迁移
苏州市房地产监测V3 已完成监管模块选择弹窗迁移，统一为 src/views/supervision/utils/selectDialog/ 下的函数式 SelectDialog.open。

## 迁移范围
- unblock/plan/detail.vue 与 planChange/detail.vue：openProjectSelect / openRegProjectSelect
- unblock/notice/detail.vue：项目 + openRegulatoryAccountSelect（划拨账号）
- unblock/InformationPush/detail.vue 与 changeDetail.vue：修复破损模板；项目 + openListSelect
- agreement/allocation/detail.vue：项目 + 调拨账号 selectRegulatoryAccountListByAdjust
- 共涉及 14 个文件，含 agreement/xy/detail.vue 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：unblock/plan/detail.vue 等多个监管模块文件
- 所属项目：苏州市房地产监测V3；来源会话：7278de3c-a6d9-41a4-acde-c8b85e2dd002；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_select_dialog_migration",
  "source_extraction_id": "15c5db80af5a4cc68efbfcf5a6974f2c",
  "version": 1,
  "memory_type": "entities"
}
-->