# 企业注册单页表单 Vue 警告修复
苏州市房地产监测V3 项目中，企业注册单页表单的 Vue 警告问题已修复。

## 问题根因
- registerFormConsumerMixin 把 form 做成只读 computed，但 CompanyRegisterSingleForm 还混入了 detailMixins
- 全局 formMode 为 add 时，detailMixins 执行 this.form = Object.assign(...) 触发警告
- 单页注册表单不依赖 detailMixins，父页已用 REGISTER_CACHE_KEY 做缓存
- ElUpload 缺少必填 action；使用 :http-request 自定义上传时惯例为 action="#"

## 修复内容
- registerFormContext.js：增加 setRegisterForm 的 provide/inject，并为 form 增加 setter
- RegisterUploadItem.vue：ElUpload 使用 action="#" 走 handleCustomUpload

## 涉及文件与归属
- 涉及文件：registerFormContext.js、CompanyRegisterSingleForm.vue、RegisterUploadItem.vue、registerValidate.js
- 所属项目：苏州市房地产监测V3
- 来源会话ID：87dc18b1-c6cb-4944-ae78-7dd985b6bc0d；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_form_fix",
  "source_extraction_id": "2f30ec58d9394013bd84cd5ef6e15455",
  "version": 1,
  "memory_type": "entities"
}
-->