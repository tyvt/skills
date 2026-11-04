# 没有 setter 的注册表单在赋值时产生警告
在 Suzhou Real Estate Monitoring V3 项目中，`registerFormConsumerMixin` 使 `form` 变为 computed readonly，但 `CompanyRegisterSingleForm` 混入了 `detailMixins`，导致在赋值 `this.form` 时产生警告。

## 问题根因
- `registerFormConsumerMixin` 使 `form` 成为 computed readonly
- `CompanyRegisterSingleForm` 引入了 `detailMixins`，导致对 `this.form` 的赋值和警告

## 解决方案
- 在 `registerFormContext.js` 中添加了 provide/inject `setRegisterForm` 和 `form` 的 setter
- 带有 `:http-request` 的 `ElUpload` 需要配置 `action='#'` 以使用 `handleCustomUpload`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/041.md
- 涉及文件: CompanyRegisterSingleForm.vue, RegisterUploadItem.vue, registerValidate.js, registerFormContext.js, detailMixins.js, form.js, companyRegister.vue, Step1CompanyInfo.vue
- 会话: 87dc18b1-c6cb-4944-ae78-7dd985b6bc0d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_form_setter",
  "source_extraction_id": "6e670e2c1ff04c55bcebae32cab0400f",
  "version": 1,
  "memory_type": "entities"
}
-->