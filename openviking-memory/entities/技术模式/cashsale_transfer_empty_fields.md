# 预售转现售取数补空字段实现幢户回显
苏州市房地产监测V3 中预售转现售详情从 /presale/permit/detail 取数后 form 空字段未补，致总幢数/总户数不回显。

## 问题根因
- 预售转现售从 /presale/permit/detail 取数后 form 空字段未补，致总幢数/总户数不回显

## 关键修复
- cashsaleConstants.js 新增 mapProjectDisplayFields 统一映射
- CashsaleDetail.vue 的 loadTransferPlan 借 patchEmptyDisplayFields 补空
- detailCallback 合并映射实现幢户回显

## 涉及文件
- presale/cashsale/components/CashsaleDetail.vue
- presale/cashsale/components/CashsaleInfoPanel.vue
- presale/cashsale/cashsaleConstants.js
- mixins/detailMixins.js
- mixins/form.js
- presale/cashsale/transfer/detail.vue
- e2e/fixtures/cashsale-transfer-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/196.md
- 来源会话ID：b85d9888-4202-4fa9-b003-9d507416419b
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_transfer_empty_fields",
  "source_extraction_id": "390d9fa5dbc94517a9908e44e267a934",
  "version": 1,
  "memory_type": "entities"
}
-->