# Detalhe de usemoney sem campos em data() gera aviso Vue e erro de interface
O detail.vue de supervision/unblock/usemoney no projeto Suzhou Real Estate Monitoring V3 (zhi2-web-admin) não declarou campos em data() causando aviso de binding e erro de concatenação de interface no mixin form.js.

## Causa raiz
- O `data()` de `src/views/supervision/unblock/usemoney/detail.vue` não declarou `primaryKey`, `moduleName`, `businessName`
- Isso causou aviso de renderização no `operation-btn-group` e erro de concatenação de caminho de interface em `getDetail()` do mixin `form.js`

## Solução
- Adicionado em `data()` os três campos alinhados com a página de lista do mesmo módulo
- Garantiu a concatenação correta de `/prefund/useMoneyApply/detail`

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-leftover/084.md
- Arquivos: usemoney/detail.vue, mixins/detailMixins.js, usemoney/index.vue, plan/detail.vue, mixins/form.js, usemoneyRevoke/detail.vue
- Projeto: Suzhou Real Estate Monitoring V3; sessão: 36f552fb-1f48-4082-96f2-5593b64d72f1; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "usemoney_detail_missing_fields",
  "source_extraction_id": "0ec9de86592745d2954137491ac6674b",
  "version": 1,
  "memory_type": "entities"
}
-->