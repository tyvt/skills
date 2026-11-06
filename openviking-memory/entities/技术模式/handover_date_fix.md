# 承接查验起止日期查看模式显示不全修复
园区公共收益项目handover/detail.vue在查看模式下起止日期仅显示开始日期，已修复为拼接开始与结束日期。

## 问题根因
- 详情页在查看模式（formMode=view）下，「承接查验起止日期」展示配置只绑定了startDate，没有拼接endDate
- 因此只显示2026-08-17，不显示结束日期

## 修复方案
- 在zhi2-web-admin/src/views/property/handover/detail.vue中，将查看模式字段值改为[this.form.startDate, this.form.endDate].filter(Boolean).join(' - ')
- 修复后显示如2026-08-17 - 2026-08-XX；若某一端为空自动省略
- 同页「前期物业服务合同期限」也存在同样问题（只显示entrustStartDate），待确认是否一并修复

## 验证与归属
- 所属项目：园区公共收益
- 涉及文件：zhi2-web-admin/src/views/property/handover/detail.vue
- 来源会话ID：a6391fef-ca00-4f65-9b24-3652ab37afa9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "handover_date_fix",
  "source_extraction_id": "c62e01cbe3b346e0bca6472ceec35b7b",
  "version": 1,
  "memory_type": "entities"
}
-->