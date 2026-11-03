# 企业入网要件编辑态未排序与查看态不一致
苏州市房地产监测V3 中企业入网要件编辑态此前未排序，与查看态排序不一致，已新增 `sortAppendixPackages` 统一排序规则。

## 问题根因
- 编辑态经 `AnnexUpload.getList` 至 `mapAppendixPackageToFileList` 此前未排序
- 查看态 `loadRequirementPackages` 按 `appendixConfig.sort` 排序
- 两端顺序不一致

## 修复方案
- `appendix.js` 新增 `sortAppendixPackages` 并于映射前排序
- `AppendixPackageSection/index.vue` 非宫格与宫格查看均复用该规则确保顺序一致

## 涉及文件
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue 与 companyRecordAgency/detail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue 与 DeveloperBasicInfoForm.vue
- zhi2-web-admin/src/components/AppendixPackageSection/index.vue
- zhi2-web-admin/src/utils/appendix.js
- zhi2-web-admin/src/components/AnnexUpload/index.vue 与 AppendixRequirementGrid.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/156.md、src=苏州市房地产监测V3/197.md
- 来源会话：435d70c1-1e98-4e05-b285-4c74fff0815e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_package_sort_consistency",
  "source_extraction_id": "84a47ab3c126474bb760ae62e5ed52d2",
  "version": 2,
  "memory_type": "entities"
}
-->