# 预售表单中字典动态加载的修复
在 苏州市房地产监测V3 项目中，PresalePlanFillForm 表单已修复以动态加载字典并调整日期字段和销售模式。

## 问题
- PresalePlanFillForm.vue 中的下拉字典未动态加载，导致联动错误

## 解决方案
- 在 permitConstants.js 中添加了如 LAND_MORTGAGE_STATE 之类的字典常量
- 在 PresalePlanFillForm.vue 中将下拉框改为使用 getDicts 进行动态加载
- consentDate 和 facilityDelivery 字段改用 zs-date-picker
- 代理行行的显示条件修正为 saleMode === '1'
- normalizeSaleMode() 映射旧的销售模式代码

## 验证与文件
- 验证: src=苏州市房地产监测V3/179.md
- 涉及文件: PermitPlanPanel.vue, PresalePlanFillForm.vue, permitConstants.js, plan/detail.vue, detail.vue, presale-permit-helpers.js
- 会话: 44a56ca5-f11d-40ff-a9f2-cd4a229a1f75

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：44a56ca5-f11d-40ff-a9f2-cd4a229a1f75


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_dict_load_fix",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 1,
  "memory_type": "entities"
}
-->
