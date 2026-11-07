# 字符串 '0' 标志错误触发结算警告
在 maintenance/final/index.vue 中，v-if="settleWarnFlag" 在 JS 中将字符串 '0' 视为真值，导致不当显示。

## 问题根因
- 结算警告 UI 使用 v-if="settleWarnFlag" 评估为真值；字符串 '0' 在 JS 中是真值。

## 解决方案
- 遵循仓库约定，对标志使用显式比较 == '1'。

## 涉及的文件
- maintenance/final/index.vue
- maintenance/completion/detail.vue
- maintenance/final/detail.vue
- mixins/listMixins.js, ListTemplate.js, table.js
- property/workOrder/order/index.vue
- maintenance/maintenanceApply/detail.vue

## 验证与归属
- 所属项目：惠山二期G
- 验证证据：extracted source=cursor project=惠山二期G
- 来源会话：7fd96eae-ff4a-4cde-8f71-536de88bfa82
- 验证证据: cursor 会话 7fd96eae-ff4a-4cde-8f71-536de88bfa82
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "settle_flag_truthy",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->