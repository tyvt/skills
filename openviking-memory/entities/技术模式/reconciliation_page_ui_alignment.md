# 账务对账页UI须对齐业务对账字典与样式
苏州市房地产监测V3 中账务对账页 UI 须对齐业务对账页，统一交互与视觉规范。

## 规范内容
- 对账模块须统一交互与视觉规范，账务对账页 UI 对齐业务对账页
- 搜索区改 `type: 'dict'`（`RECONCILIATION_METHOD`、`RECONCILIATION_STATUS`）防裸数字
- 搜索区补 `model: 'beginTime'`
- 按钮更名「手工对账」并去除 `plain`
- 双表区增橙色 `el-alert` 且样式对齐 `finance/rec/index.vue`

## 涉及文件
- zhi2-web-admin/src/views/repairFunds/verifyRecord/index.vue
- 路由信息.json 与 repairFunds/finance/rec/index.vue（参照页）
- zhi2-web-admin/src/mixins/ListTemplate.js
- zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue 与 SearchFormItem.vue
- zhi2-web-admin/src/api/capital/verifyRecord.js 与 maintenance/maintenanceRec/index.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/157.md、src=苏州市房地产监测V3/197.md
- 来源会话：62ae63d9-de46-4756-a36e-4e7c34c9a158；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reconciliation_page_ui_alignment",
  "source_extraction_id": "84a47ab3c126474bb760ae62e5ed52d2",
  "version": 2,
  "memory_type": "entities"
}
-->