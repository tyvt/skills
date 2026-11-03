# Regulatory Amount Calculation Fix
淮安存量房 zhi2-web-admin 中协议详情页监管划转金额计算的已知缺陷与修复约定。

## 问题背景
- 全额监管切部分监管时 regulatoryAmount 未清空且 watch 浅监听未触发重算，致 transferAmount 错误。
- 主要问题文件为 zhi2-web-admin/src/views/v1/presale/stock/agreement/detail.vue。

## 修复方案
- setregulatory 增加部分监管分支清空金额。
- watch 监听 form.contractAmount 与 form.regulatoryAmount。
- moneyCalculation 按监管类型("1"/"2")算 transferAmount，并于 getDetail 及 @input 调用。

## 涉及文件
- zhi2-web-admin/src/views/v1/presale/stock/agreement/detail.vue
- zhi2-web-admin/src/views/v1/presale/stock/bankConfirm/detail.vue
- zhi2-web-admin/src/views/v1/presale/stock/comprehensiveQuery/detail.vue
- zhi2-web-admin/src/views/v1/presale/stock/agreement/index.vue

## 验证与归属
- 验证证据：src=淮安存量房/002.md
- 来源会话：c0853ff6-9071-4f61-b126-927718e7cf7e

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "regulatory_amount_calc",
  "source_extraction_id": "078a8106ac514c8793e34bbb17ed1b81",
  "version": 1,
  "memory_type": "entities"
}
-->