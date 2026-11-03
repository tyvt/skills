# 写死labelAlign:right破坏详情左对齐
苏州市房地产监测V3 的 AgencyBranchDetail.vue 与 AgencyPersonnelDetail.vue 写死 labelAlign:'right' 覆盖 DetailTemplate 默认左对齐。

## 问题根因
- AgencyBranchDetail.vue 与 AgencyPersonnelDetail.vue 的 basicInfoView 等写死 labelAlign:'right'
- 覆盖 DetailTemplate 默认左对齐样式

## 解决方案
- 移除两文件所有 labelAlign:'right'，字段配置与 agencyBasicInfoContent.js 一致，全库无残留
- 编辑态表单 label-position='right' 保留

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/226.md
- 涉及文件：institution/agencyBranch/components/AgencyBranchDetail.vue、components/detail-template/detail-template.vue、company/companyManagement/components/AgencyBasicInfoDetail.vue、company/companyApplyAudit/detail.vue、company/companyManagement/components/agencyBasicInfoContent.js、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c4eb806c-2a5f-4658-851d-043e02be26a0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "detail_labelalign_right",
  "source_extraction_id": "4fe7174ff6a848f997b961c458a1194b",
  "version": 2,
  "memory_type": "entities"
}
-->