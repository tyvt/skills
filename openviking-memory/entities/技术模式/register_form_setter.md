# Form de registro sem setter gera aviso ao ser atribuído
No projeto Suzhou Real Estate Monitoring V3, `registerFormConsumerMixin` tornou `form` computed somente leitura, mas `CompanyRegisterSingleForm` misturou `detailMixins` causando aviso ao atribuir `this.form`.

## 问题根因
- `registerFormConsumerMixin` fez `form` ser computed readonly
- `CompanyRegisterSingleForm` incluiu `detailMixins` causando atribuição `this.form` e aviso

## 解决方案
- Em `registerFormContext.js` adicionado provide/inject `setRegisterForm` e setter para `form`
- `ElUpload` com `:http-request` precisa configurar `action='#'` para usar `handleCustomUpload`

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3-leftover/041.md
- 涉及文件: CompanyRegisterSingleForm.vue, RegisterUploadItem.vue, registerValidate.js, registerFormContext.js, detailMixins.js, form.js, companyRegister.vue, Step1CompanyInfo.vue
- Sessão: 87dc18b1-c6cb-4944-ae78-7dd985b6bc0d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_form_setter",
  "source_extraction_id": "6e670e2c1ff04c55bcebae32cab0400f",
  "version": 1,
  "memory_type": "entities"
}
-->