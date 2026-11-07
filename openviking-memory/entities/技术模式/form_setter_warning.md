# 未分配 Setter 的表单触发 Vue 警告
在 Suzhou Real Estate Monitoring V3 项目中，`registerFormConsumerMixin` 将 `form` 定义为只读 computed；`CompanyRegisterSingleForm` 混合了 `detailMixins`，并在 `formMode:'add'` 时执行 `this.form = Object.assign(...)` 触发 Vue 警告；带有 `:http-request` 的 `ElUpload` 缺少 `action`。

## 问题根因
- `form` 通过 `registerFormConsumerMixin` 成为只读 computed
- `detailMixins` 在 add 模式下赋值 `this.form` 导致警告
- 自定义 `ElUpload` 缺少必需的 `action`

## 解决方案
- `registerFormContext.js` 添加 provide/inject `setRegisterForm` 以及 `form` 的 setter
- `ElUpload` 定义 `action="#"` 以使用 `handleCustomUpload`

## 验证
- 验证证据: src=苏州市房地产监测V3/241.md
- 涉及文件: register/components/single-page/CompanyRegisterSingleForm.vue, register/components/RegisterUploadItem.vue, utils/registerValidate.js, utils/registerFormContext.js, mixins/detailMixins.js, mixins/form.js, register/companyRegister.vue, register/components/Step1CompanyInfo.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 87dc18b1-c6cb-4944-ae78-7dd985b6bc0d; Base: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：87dc18b1-c6cb-4944-ae78-7dd985b6bc0d


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "form_setter_warning",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 1,
  "memory_type": "entities"
}
-->
