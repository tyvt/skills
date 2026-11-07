# PermitPlanPanel 预售方案文案硬编码修复
苏州市房地产监测V3 中 PermitPlanPanel.vue 的「需先在系统内完成信息维护」说明硬编码「预售方案」，现售备案传 plan-title=现售方案时仍显示预售，已改为模板使用 {{ planTitle }} 前缀。

## 问题描述
- PermitPlanPanel.vue 内「…需先在系统内完成信息维护」说明硬编码「预售方案」
- 现售备案传 plan-title=现售方案 时，页面仍显示「预售方案」而非「现售方案」

## 修复内容
- 模板说明文案改用 `{{ planTitle }}` 前缀，与 CashsaleDetail 传入的 planTitle 一致
- 现售备案场景下正确显示「现售方案」

## 归属信息
- 所属项目：苏州市房地产监测V3
- 来源工单：禅道6322
- 涉及文件：PermitPlanPanel.vue、CashsaleDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_plan_title_fix",
  "source_extraction_id": "049b982b00254f63b05923326d9a6f2f",
  "version": 1,
  "memory_type": "entities"
}
-->