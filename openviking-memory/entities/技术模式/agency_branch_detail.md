# 分支机构详情要件网格与服务方案条数显示
苏州市房地产监测V3 的 zhi2-web-admin 已完成分支机构详情与服务方案的展示改造。

## 改动内容
- AgencyBranchDetail.vue 查看态要件上传改为 AppendixPackageSection + requirement-grid（与编辑态、入网审核一致）
- 移除 requirementPackages、appendixContentInfo、loadRequirementPackages 及详情里重复拉包逻辑
- AgencyBranchDetail.vue 服务方案表格下增加 zs-pagination（:total="schemeList.length" :show-pagination="false"），显示「共 N 条记录」
- ServiceSchemePanel.vue 编辑态服务方案表格下同样增加仅展示总数的 zs-pagination（innerList.length）
- companyRecordAgency/detail.vue 机构入网备案详情同步调整

## 涉及文件
- zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue
- zhi2-web-admin/src/views/institution/agencyBranch/components/ServiceSchemePanel.vue
- zhi2-web-admin/src/views/company/companyRecordAgency/detail.vue
- zhi2-web-admin/src/styles/detail-form.scss

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：f5699df1-2d0b-4ac2-b011-337f320d4b34；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_detail",
  "source_extraction_id": "11c8801bf8684342866a4b4661e1ae1f",
  "version": 1,
  "memory_type": "entities"
}
-->