# 地址列 sm=16 未适配半列致宽度仅 1/3
register-form.scss 仅将 el-col-sm-12 作半列，地址列 :sm="16" 落到默认 lg/xl=8 宽度变 1/3 且错位，已改为 :sm="12"。

## 缺陷描述
- src/styles/register-form.scss:90 仅将 el-col-sm-12 作半列
- 地址列 :sm="16" 落到 Element 默认 lg/xl=8 宽度变 1/3 且错位

## 修复方案
- CompanyRegisterSingleForm.vue:56 与 InstitutionRegisterSingleForm.vue:57,156 中 :sm="16" 改为 :sm="12"

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/209.md
- 涉及文件：register/companyRegister.vue、measure-register.mjs、register/components/single-page/CompanyRegisterSingleForm.vue、src/styles/register-form.scss、InstitutionRegisterSingleForm.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a1668f-182b-764e-99b7-4185995a2d99；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_address_sm16_fix",
  "source_extraction_id": "410c6abe2a3b43599e57be64b1b56ab3",
  "version": 1,
  "memory_type": "entities"
}
-->