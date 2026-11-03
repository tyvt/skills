# Form sem Setter Atribuído Dispara Aviso Vue
No projeto Suzhou Real Estate Monitoring V3, `registerFormConsumerMixin` define `form` como computed readonly; `CompanyRegisterSingleForm` mistura `detailMixins` e em `formMode:'add'` faz `this.form = Object.assign(...)` disparando aviso Vue; `ElUpload` com `:http-request` falta `action`.

## Causa Raiz
- `form` é computed readonly via `registerFormConsumerMixin`
- `detailMixins` em modo add atribui `this.form` causando aviso
- `ElUpload` customizado sem `action` obrigatório

## Solução
- `registerFormContext.js` adiciona provide/inject `setRegisterForm` e setter para `form`
- `ElUpload` define `action="#"` para usar `handleCustomUpload`

## Verificação
- Evidência: src=苏州市房地产监测V3/241.md
- Arquivos: register/components/single-page/CompanyRegisterSingleForm.vue, register/components/RegisterUploadItem.vue, utils/registerValidate.js, utils/registerFormContext.js, mixins/detailMixins.js, mixins/form.js, register/companyRegister.vue, register/components/Step1CompanyInfo.vue
- Projeto: Suzhou Real Estate Monitoring V3; Sessão: 87dc18b1-c6cb-4944-ae78-7dd985b6bc0d; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "form_setter_warning",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 1,
  "memory_type": "entities"
}
-->