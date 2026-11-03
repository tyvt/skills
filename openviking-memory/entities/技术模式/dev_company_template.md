# 开发企业详情页复用模板移除经纪机构逻辑
苏州市房地产监测V3 中 CompanyBasicInfoDetail.vue 改为复用开发企业模板并移除经纪机构逻辑。

## 变更点
- 业务状态改用 form.bizState 与 biz_state 字典，移除 getCompanyApplyOverview 等经纪机构逻辑
- 办公信息调用 buildCompanyBasicContentInfo2
- 附件组件由 AnnexUpload 替换为 LicenseAppendix 消除乱码
- 基本信息复用 buildCompanyBasicContentInfo 与 DetailTemplate 对齐开发企业模板

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/041.md
- 涉及文件：CompanyBasicInfoDetail.vue、companyBasicInfoContent.js、detail.vue、AnnexUpload/index.vue、toB/companyRecord/detail.vue、api/company/companyRecord.js、api/company/companyRegister.js、CompanyBasicInfoForm.vue
- 所属项目：苏州市房地产监测V3；来源会话：2c756fb1-3104-49e3-a267-f18e9110ae47；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dev_company_template",
  "source_extraction_id": "c92b7ca5b7f64394b3c0e71429202704",
  "version": 1,
  "memory_type": "entities"
}
-->