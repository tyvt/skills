# Chamada Indevida de getDetail por Mixin sem Parâmetros
No projeto Suzhou Real Estate Monitoring V3, `QualificationFormSection.vue` usava `detailMixins` sem `moduleName`, fazendo `init()` chamar `getDetail()` em interface errada.

## 问题根因
- `QualificationFormSection.vue` usava incorretamente `detailMixins` sem parâmetros como `moduleName`
- `init()` do mixin chamava `getDetail()` contra interface anômala por falta de parâmetros

## 解决方案
- Removido o `detailMixins` do componente, mantido apenas `registerFormConsumerMixin`
- `detailMixins.js` faz `init()` retornar direto quando faltam parâmetros
- `validateDetailRequiredParams` emite `warn` para parâmetros ausentes

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/151.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: QualificationFormSection.vue, detailMixins.js, form.js, Step1CompanyInfo.vue, registerValidate.js, DeveloperBasicInfoForm.vue, registerFormContext.js, formComponents.js
- Sessão: 5584ad88-6363-48c5-9d3d-5f769967f5f6; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "mixin_missing_params_getdetail",
  "source_extraction_id": "21ad71f1e972470cb366751ddbf5140c",
  "version": 1,
  "memory_type": "entities"
}
-->