# 账务对账页 UI 对齐业务对账
苏州市房地产监测V3 完成账务对账页（repairFunds/verifyRecord）UI 对齐业务对账（finance/rec）。

## 搜索区与按钮
- 对账方式 / 对账状态改为 type: 'dict'（RECONCILIATION_METHOD、RECONCILIATION_STATUS），避免默认 1 显示为裸数字
- initDict 校验默认 reconciliationStatus: '1' 是否在字典内，否则清空，账户文案统一为监管账号
- 「手工核销」改为「手工对账」，去掉 plain，成功提示为「手工对账成功」

## 双表区域与归属
- 增加与业务对账相同的橙色 el-alert 提示，表头灰底、间距、表格外框与 finance/rec/index.vue 一致
- 所属项目：苏州市房地产监测V3
- 来源会话：62ae63d9-de46-4756-a36e-4e7c34c9a158
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：repairFunds/verifyRecord/index.vue、finance/rec/index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "verify_record_ui_align",
  "source_extraction_id": "152541cf03c74c8fbf304040976910c6",
  "version": 1,
  "memory_type": "entities"
}
-->