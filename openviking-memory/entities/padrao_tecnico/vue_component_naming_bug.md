# Falta de Campos e Nome de Componente Incorreto Causa Aviso Vue
No projeto Suzhou Real Estate Monitoring V3, `detail.vue` e `changeDetail.vue` não declaram chave primária e campos e têm nome de componente incompatível, disparando Vue warn.

## Causa Raiz
- `detail.vue` e `changeDetail.vue` não declaram `primaryKey`, `moduleName`, `businessName` em `data()`
- Nome de componente incompatível dispara Vue warn

## Solução Chave
- Adicionar três campos (`businessName` como 'infoReport' e 'infoReportChange')
- Renomear componentes para `InformationPushDetail` e `InformationPushChangeDetail`
- Limpar indentação redundante em `data()`

## Verificação e Atribuição
- Evidência: src=苏州市房地产监测V3/103.md
- Arquivos: detail.vue, changeDetail.vue, detailMixins.js, InformationPush.js, InformationPushChange.js, form.js, notice/detail.vue
- Sessão: b2283e1b-5660-4ecc-9c6b-175b05319777; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "vue_component_naming_bug",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 2,
  "memory_type": "entities"
}
-->