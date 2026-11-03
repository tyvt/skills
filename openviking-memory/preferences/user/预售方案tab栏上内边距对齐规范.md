- 为与预售申请详情 Tab 顶距一致，PresalePlanFillForm.vue 的 .plan-fill-tabs :deep(.tabs-bar) 增加 16px 上内边距
- CashsalePlanFillForm.vue 同步修改
- 涉及文件：presale/permit/components/detail.vue、permitConstants.js、PresaleBuildingSection.vue、permit/plan/detail.vue、PresalePlanFillForm.vue、styles/index.scss、cashsale/plan/detail.vue、CashsalePlanFillForm.vue
- 验证：extracted source=cursor session=4888d8ae-3851-4690-936f-b2202e52f6b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "预售方案Tab栏上内边距对齐规范",
  "source_extraction_id": "9ec424c99f23457eb2c7ee2cf0b4b892",
  "version": 1,
  "memory_type": "preferences"
}
-->