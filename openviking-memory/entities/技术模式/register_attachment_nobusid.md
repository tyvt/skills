# 无 busId 的注册附件上传
在 Suzhou Real Estate Monitoring V3 项目中，注册附件的上传不依赖于 busId，而是在提交后由后端处理。

## 背景
- 企业注册（`companyRegisterId`）在拉取附件要求时，若无 `busId` 上传模式，经常返回空
- 附件上传不依赖于 `busId`，而是依赖于 `saveAndSubmit`，其将 `attachmentList` 发送至后端处理附件的组装

## 涉及文件
- `AnnexUpload/components/AppendixRequirementCard.vue`
- `utils/appendix.js`
- `views/register/companyRegister.vue`
- `views/register/components/single-page/CompanyRegisterSingleForm.vue`
- `views/institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue`
- `api/company/companyRegister.js`
- `views/institutionRegister/components/InstitutionUploadItem.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/025.md
- 会话ID: 2026e41e-c4eb-4375-afbb-6894581445bf
- 所属项目: Suzhou Real Estate Monitoring V3; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_attachment_nobusid",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->