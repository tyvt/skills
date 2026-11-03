# Falta de Campos em Detalhe de Garantia Causa Erro de Requisição
No projeto Suzhou Real Estate Monitoring V3, o `data()` de `guarantee/detail.vue` não tem `primaryKey`, `moduleName`, `businessName`, causando aviso Vue e impedindo `getDetail()` de montar `/prefund/useMoneyApply/detail`.

## Causa Raiz
- `data()` de `guarantee/detail.vue` ausência dos campos `primaryKey`, `moduleName`, `businessName`
- Causa aviso Vue e `getDetail()` falha ao concatenar `/prefund/useMoneyApply/detail`

## Solução
- Completar os três campos em `data()` de `guarantee/detail.vue` alinhados com `guarantee/index.vue`

## Verificação e Atribuição
- Evidência: src=苏州市房地产监测V3/202.md
- Arquivos: supervision/unblock/guarantee/detail.vue, mixins/detailMixins.js, supervision/unblock/guarantee/index.vue, supervision/unblock/usemoney/detail.vue, supervision/unblock/guarantee/changedetail.vue, supervision/unblock/usemoneyRevoke/detail.vue, mixins/form.js, supervision/unblock/notice/detail.vue
- Projeto: Suzhou Real Estate Monitoring V3; Sessão: e533c035-bd03-4c12-aa72-72937c898843; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "guarantee_detail_fields",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 2,
  "memory_type": "entities"
}
-->