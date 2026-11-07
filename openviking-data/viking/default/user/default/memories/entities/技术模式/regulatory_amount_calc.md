
# 监管划转金额计算修复
淮安存量房 zhi2-web-admin 中协议详情页监管划转金额计算的已知缺陷与修复约定。

## 问题背景
- 全额监管切部分监管时 regulatoryAmount 未清空，且 watch 浅监听未触发重算，导致 transferAmount 错误。
- 主要问题文件为 zhi2-web-admin/src/views/v1/presale/stock/agreement/detail.vue。

## 修复方案
- setregulatory 增加部分监管分支：从全额监管切换到部分监管时，若 regulatoryAmount === contractAmount，清空监管金额，避免自行划转金额仍为 0。
- watch 改为字段级监听：监听 form.contractAmount 与 form.regulatoryAmount，金额变化时自动重算。
- moneyCalculation 按监管类型计算：部分监管（"1"）时 transferAmount = contractAmount - regulatoryAmount；全额监管（"2"）时 transferAmount = 0。
- 触发时机补充：getDetail() 加载数据后调用 moneyCalculation()；监管金额输入框增加 @input 实时计算；禁用条件改为 String（原文截断）。

## 涉及文件
- zhi2-web-admin/src/views/v1/presale/stock/agreement/detail.vue
- zhi2-web-admin/src/views/v1/presale/stock/bankConfirm/detail.vue
- zhi2-web-admin/src/views/v1/presale/stock/comprehensiveQuery/detail.vue
- zhi2-web-admin/src/views/v1/presale/stock/agreement/index.vue

## 验证与归属
- 所属项目：淮安存量房
- 验证证据：extracted source=cursor project=淮安存量房
- 验证证据：src=淮安存量房/002.md；提取来源=cursor，项目=淮安存量房
- 来源会话：c0853ff6-9071-4f61-b126-927718e7cf7e；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_amount_calc",
  "source_extraction_id": "fa83ecab347c4c8589616dabc1e817f7",
  "version": 2,
  "memory_type": "entities"
}
-->