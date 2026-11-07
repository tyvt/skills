# 开发企业注册sample.png非默认图说明
苏州市房地产监测V3 开发企业注册页回显的 sample.png 实为 Playwright E2E 测试文件，并非写死的默认图。

## 文件与用例
- 仓库仅 E2E 用到 `zhi2-web-admin/e2e/assets/test-files/sample.png`
- `company-register.spec.js`、`register-helpers.js` 中 `proceedStep3WithUpload` / `uploadAllAppendixItems` 会点「上传」并选该文件

## 上传机制
- 单页注册走匿名上传 `uploadAnonymous`，未绑定注册单时常不传 `busId`
- `CompanyRegisterSingleForm` 的 `initAppendix` 仅拉 `busCode: '040100'`，与匿名上传一致

## 回显成因
- 联调或本地若与 E2E 共用同一文件服务/库，后端 `listAppendixPackage`（只传 busCode、不传 busId）仍可能把历史匿名上传的 sample.png 塞进 `packages[].appendix`
- 页面加载即回显，看起来像「默认附件」

## 验证与归属
- 涉及文件：`company-register.spec.js`、`register-helpers.js`、`CompanyRegisterSingleForm.vue`、`appendix.js`、`companyRegister.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：b223bece-b917-46c7-a279-8dc171afcbd4；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_sample_png",
  "source_extraction_id": "8b8445b83fa44410a50f1a1c49887871",
  "version": 1,
  "memory_type": "entities"
}
-->