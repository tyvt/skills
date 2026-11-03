# 经纪机构详情页缺共享布局常量致不统一
苏州市房地产监测V3 经纪机构管理菜单下详情页查看模式布局不一致，缺乏共享布局定义。

## 问题根因
- 经纪机构管理菜单下详情页查看模式布局不一致
- 缺乏共享布局定义导致各页面各自实现

## 修复方案
- agencyBasicInfoContent.js 导出 HALF_LAYOUT 与 FULL_LAYOUT 共享布局常量
- 修改 personnelCertificate/detail.vue、brand/detail.vue 等 5 个页面引用对应布局

## 涉及文件
- detail-template.vue、company/companyManagement/components/agencyBasicInfoContent.js
- company/brand/detail.vue、personnelCertificate/detail.vue
- company/institutionRegister/detail.vue、company/companyApply/detail.vue
- institution/agencyBranch/components/AgencyBranchDetail.vue
- institution/agencyPersonnel/components/AgencyPersonnelDetail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/131.md
- 来源会话：a842ef5b-a67e-4ebf-9a51-02e32f93dfee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_layout_constants",
  "source_extraction_id": "d59ddbfaa7294cb29f8936825d8b0a16",
  "version": 1,
  "memory_type": "entities"
}
-->