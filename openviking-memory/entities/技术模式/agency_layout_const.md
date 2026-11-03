# 经纪机构详情页未复用布局常量致不统一
苏州市房地产监测V3经纪机构管理菜单下详情页未统一一行两列布局，新增布局常量复用。

## 问题根因
- 经纪机构管理菜单下详情页 DetailTemplate 未统一一行两列布局

## 修复方案
- agencyBasicInfoContent.js 导出 HALF_LAYOUT 与 FULL_LAYOUT 常量
- personnelCertificate/detail.vue 等 5 个页面引用以实现统一展示

## 涉及文件
- detail-template.vue、agencyBasicInfoContent.js、brand/detail.vue
- personnelCertificate/detail.vue、institutionRegister/detail.vue
- companyApply/detail.vue、AgencyBranchDetail.vue、AgencyPersonnelDetail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/084.md
- 所属项目：苏州市房地产监测V3；来源会话：a842ef5b-a67e-4ebf-9a51-02e32f93dfee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_layout_const",
  "source_extraction_id": "c9ec89c294bb40ec83fcfcf2a273efec",
  "version": 1,
  "memory_type": "entities"
}
-->