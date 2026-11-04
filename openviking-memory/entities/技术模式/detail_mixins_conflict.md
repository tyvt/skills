# detailMixins 使用不当导致冲突并覆写 form
在 Suzhou Real Estate Monitoring V3 项目中，`detailMixins` 引入了来自 area mixin 的 computed `regionOptions`，与 CompanyCancelDetail 的 data 以及 CompanyBasicInfoForm 的 prop 发生冲突；CompanyBasicInfoForm 在 view 模式下使用了 detailMixins，覆写了 form 的 prop。

## 问题根因
- `detailMixins` 带来了 `regionOptions`，与 CompanyCancelDetail 的 `data` 以及 CompanyBasicInfoForm 的 prop 冲突（同名）
- CompanyBasicInfoForm 使用了 `detailMixins`；在 view 模式下执行了 `init()->getDetail()->detailCallback()`，覆写了 form 的 prop

## 解决方案
- `CompanyBasicInfoForm.vue` 移除了 `detailMixins` 并直接引入了 `Headline`、`DetailTemplate`；编辑模式使用父级的 form
- `companyCancel/detail.vue` 将 `regionOptions` 重命名为 `economicRegionOptions`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/039.md
- 涉及文件: companyCancel/detail.vue, CompanyBasicInfoForm.vue, detailMixins.js, area.js, companyApply/detail.vue, companyRecordAgency/change/detail.vue, toB/companyRecord/detail.vue, form.js
- 会话: 9aaca310-0d97-443b-83c2-2382ce1e8d98; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_mixins_conflict",
  "source_extraction_id": "6e670e2c1ff04c55bcebae32cab0400f",
  "version": 1,
  "memory_type": "entities"
}
-->