# regionOptions 与 area Mixin 的命名冲突
在 Suzhou Real Estate Monitoring V3 项目中，本地的 `data` `regionOptions` 与 mixin `area` (通过 `detailMixins`) 中的 computed `regionOptions` 冲突，导致 Vue 警告和 prop 污染。

## 问题根因
- 本地 `data` `regionOptions` 与 `detailMixins` 中 mixin `area` 的 computed `regionOptions` 冲突
- `CompanyCancelDetail` 的 data 和 `CompanyBasicInfoForm` 的 prop 同名，导致冲突
- `CompanyBasicInfoForm` 在 view 模式下错误地使用了 `detailMixins`，执行了 `init()` 并覆盖了 prop `form`

## 解决方案
- `companyRecordAgency/change/detail.vue` 和 `toB/companyRecord/detail.vue` 将本地字段重命名为 `administrativeAreaOptions`
- `companyCancel/detail.vue` 将 `regionOptions` 重命名为 `economicRegionOptions`
- `CompanyBasicInfoForm.vue` 移除 `detailMixins`，直接导入 `Headline` 和 `DetailTemplate` 并复用父级的 `form`
- 在 template、data、`initDict()` 和 catch 分支中同步更改

## 范围
- 还涉及 companyApplyAudit/detail.vue、CompanyBasicInfoForm/Detail、transferDiscount/detail.vue、companyApply/detail.vue 等。

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/073.md; src=苏州市房地产监测V3/122.md; src=苏州市房地产监测V3/239.md
- 涉及文件: toB/companyRecord/detail.vue, area.js, detailMixins.js, companyApplyAudit/detail.vue, companyRecordAgency/change/detail.vue, CompanyBasicInfoForm.vue, CompanyBasicInfoDetail.vue, transferDiscount/detail.vue, companyCancel/detail.vue, companyApply/detail.vue, form.js
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 8173eb01-8b73-474d-a30a-4662d6fb521e, 9aaca310-0d97-443b-83c2-2382ce1e8d98; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "region_options_conflict",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 3,
  "memory_type": "entities"
}
-->