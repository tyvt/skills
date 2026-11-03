# 两列栅格FORM_COL_WIDE未归一化致错位
AgencyPersonnelDetail.vue 的两列栅格中 FORM_COL_WIDE 未归一化，打破 50/50 布局并致标签错位。

## 问题根因
- AgencyPersonnelDetail.vue 的 DetailTemplate 两列栅格中，户籍地址字段 FORM_COL_WIDE(span=16) 未归一化
- 标签列宽计算不认该值，打破 50/50 布局并致标签错位

## 解决方案
- 统一 layout 为 HALF_LAYOUT 并移除 FORM_COL_WIDE 导入
- 全局仅该文件两列模板存在此异常

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/101.md
- 涉及文件：institution/leasePersonnel/components/LeasePersonnelDetail.vue、transaction/secondHouseAgent/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、institution/components/PersonnelBasicInfoLayout.vue、utils/detailLayout.js、company/companyManagement/components/agencyBasicInfoContent.js、components/detail-template/detail-template.vue、company/personnelCertificate/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：df6caac4-1d69-43b0-b9fe-7fd0af3007ab；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_col_wide_layout",
  "source_extraction_id": "2136db77eeb545a3bfb5c7faab73e6ab",
  "version": 1,
  "memory_type": "entities"
}
-->