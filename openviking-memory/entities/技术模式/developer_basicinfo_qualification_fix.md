# 开发企业基本信息资质与要件显示修复
苏州市房地产监测V3 项目修复开发企业基本信息的资质信息区块与要件上传显示。

## 修改文件
- zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue
- zhi2-web-admin/src/components/AppendixPackageSection/index.vue
- zhi2-web-admin/e2e/company/company-record-flow.spec.js

## 资质信息改动
- 在「办公信息」与「要件上传」之间增加资质信息区块，使用 DetailTemplate + buildQualificationContentInfo
- 备案加载成功后调用 POST /company/qualification/pageNoPermissions，取首条资质并 normalizeQualificationRow
- 补充字典 company_qualification_type、company_qualification_level

## 要件上传改动
- 只读模式 listAppendixPackage 与 AnnexUpload 对齐，增加 companyId 等参数

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：3005c34e-34a1-4ca2-8aba-d990a0327a79
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "developer_basicinfo_qualification_fix",
  "source_extraction_id": "1eb3332663a64041aab0610806717357",
  "version": 1,
  "memory_type": "entities"
}
-->