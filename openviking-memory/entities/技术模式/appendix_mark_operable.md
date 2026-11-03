# 要件上传必填星号由 operable 控制显隐
`AppendixRequirementCard.vue` 未区分查看/编辑态误显必填星号，新增 `showRequiredMark` 计算属性按 `operable` 控制。

## 问题根因
- `AppendixRequirementCard.vue` 未根据 `operable` 属性区分查看态与编辑态，导致详情页（查看态）误显必填红色 `*`。

## 解决方案
- 组件新增计算属性 `showRequiredMark`：仅当 `operable === true` 且 `isRequired === '1'` 时显示红色 `*`。
- `AppendixPackageSection` 传 `operable=false`（查看态不显星号），`AnnexUpload` 传 `operable=true`（编辑态显星号）。
- `checkRequiredAppendix` 校验逻辑保持不变。

## 验证与归属
- 验证来源：苏州市房地产监测V3-leftover/045.md
- 涉及文件：zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementCard.vue、AppendixRequirementGrid.vue、src/views/toB/companyRecord/detail.vue、src/components/AnnexUpload/index.vue、src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue、src/components/AppendixPackageSection/index.vue、src/views/institution/agencyBranch/components/AgencyBranchDetail.vue、e2e/utils/appendix-requirement-grid.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：b4676408-39dd-4ce7-bd44-3126514f23d0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_mark_operable",
  "source_extraction_id": "5ad31a75992c4b8cb328e228a9a7a66a",
  "version": 1,
  "memory_type": "entities"
}
-->