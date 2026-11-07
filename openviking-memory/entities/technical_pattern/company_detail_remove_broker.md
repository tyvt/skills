# 开发企业详情去经纪逻辑对齐模板
苏州市房地产监测V3中 `CompanyBasicInfoDetail.vue` 移除经纪机构逻辑与字段，改用通用详情模板渲染基本信息。

## 实现要点
- `CompanyBasicInfoDetail.vue` 移除经纪机构逻辑与字段
- 基本信息采用 `buildCompanyBasicContentInfo` + `DetailTemplate` 渲染
- 办公信息改用 `buildCompanyBasicContentInfo2` 展示
- 附件以 `LicenseAppendix` 替换 `AnnexUpload` 修复乱码

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/094.md
- 涉及文件：CompanyBasicInfoDetail.vue、companyBasicInfoContent.js、detail.vue、AnnexUpload/index.vue、toB/companyRecord/detail.vue、companyRecord.js、companyRegister.js、CompanyBasicInfoForm.vue
- 所属项目：苏州市房地产监测V3；来源会话：2c756fb1-3104-49e3-a267-f18e9110ae47；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "company_detail_remove_broker",
  "source_extraction_id": "999b4bd863ec4b209ac8f3d1a7f02e39",
  "version": 1,
  "memory_type": "entities"
}
-->