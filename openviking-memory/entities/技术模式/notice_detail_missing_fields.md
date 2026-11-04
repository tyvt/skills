# Falta de Campos CRUD em Detail de Aviso Causa Aviso Vue e Erro de API
No projeto Suzhou Real Estate Monitoring V3, detail.vue de supervision/unblock/notice não declarou campos em data(), causando aviso de binding e erro de concatenação de API no mixin form.js.

## 问题根因
- `src/views/supervision/unblock/notice/detail.vue` não declarou `primaryKey`, `moduleName`, `businessName` em `data()`
- Causou aviso de binding em `operation-btn-group` e erro de concatenação de API no mixin `form.js`

## 解决方案
- Adicionou-se em `data()` `primaryKey: 'allotNoticeId'`, `moduleName: 'prefund'`, `businessName: 'notice'`
- Valores alinhados com o caminho de API do módulo

## Verificação
- 验证证据: src=苏州市房地产监测V3/238.md
- 涉及文件: detail.vue, detailMixins.js, deposit/notice/detail.vue, form.js, api/capital/notice.js, unblock/noticeChange/detail.vue, unblock/guarantee/changedetail.vue, formComponents.js
- 所属项目: Suzhou Real Estate Monitoring V3; sessão: f35d14e1-f0a5-4fa4-b44d-947275ba1b5c; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "notice_detail_missing_fields",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 4,
  "memory_type": "entities"
}
-->