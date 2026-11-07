# 租赁机构注册协议下空白因双下边距叠加
苏州市房地产监测V3 的 zhi2-web-admin 中租赁机构注册页因全局与协议容器下边距叠加出现过大空白，通过动态类隔离边距修复。

## 问题根因
- 全局 `.institution-register-form` 的 `padding-bottom:48px` 与租赁机构 `.agreement-wrap` 的 `margin-bottom:88px` 叠加致空白过大

## 修复方案
- 在 `InstitutionRegisterSingleForm.vue` 动态加 `has-agreement` 类
- 租赁机构时设 `padding-bottom:0` 仅留协议边距避让底栏

## 涉及文件
- zhi2-web-admin/src/views/register/components/single-page/CompanyRegisterSingleForm.vue
- zhi2-web-admin/src/views/institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue
- zhi2-web-admin/src/components/AnnexUpload/index.vue
- zhi2-web-admin/src/views/register/components/RegisterUploadItem.vue
- zhi2-web-admin/src/components/AppendixPackageSection/index.vue
- zhi2-web-admin/src/views/register/components/Step3Appendix.vue
- zhi2-web-admin/src/views/institution/agencyBranch/components/AppendixPictureUpload.vue
- zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementGrid.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/183.md
- 来源会话ID：08c8c33f-395a-42c3-ab4b-468a9d18c04b
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_form_blank_margin",
  "source_extraction_id": "dbef7d368b1740119fb77620e86c1a0f",
  "version": 1,
  "memory_type": "entities"
}
-->