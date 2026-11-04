# Falta de Campos em Detail de Mudança Causa Aviso Vue e Erro de API
No projeto Suzhou Real Estate Monitoring V3, `change/detail.vue` não declarou campos em `data()`, causando aviso Vue e erro de concatenação de caminho de API.

## 问题根因
- `change/detail.vue` não declarou `primaryKey`/`moduleName`/`businessName` em `data()`
- Causou aviso de renderização Vue e erro de concatenação de API em `getDetail()`/`submitForm()` do mixin `form.js`

## 解决方案
- Em `zhi2-web-admin/src/views/supervision/progress/change/detail.vue` adicionou-se `primaryKey: 'proChangeId'`, `moduleName: 'prefund'`, `businessName: 'proChange'` em `data()`

## Verificação
- 验证证据: src=苏州市房地产监测V3-leftover/098.md
- 涉及文件: supervision/progress/change/detail.vue, supervision/progress/node/detail.vue, mixins/detailMixins.js, supervision/progress/change/index.vue, mixins/form.js
- 所属项目: Suzhou Real Estate Monitoring V3; sessão: 877ff504-7267-4d24-9ee5-644aa1f9adbb; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "change_detail_missing_fields",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 3,
  "memory_type": "entities"
}
-->