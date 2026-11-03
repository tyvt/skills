# Campos ausentes em detail.vue causam aviso Vue
No projeto 苏州市房地产监测V3, `detail.vue` e `changeDetail.vue` de InformationPush ausentam `primaryKey`, `moduleName`, `businessName` e têm nomes irregulares, gerando Vue warn.

## Causa raiz
- `detail.vue` e `changeDetail.vue` de supervision/unblock/InformationPush ausentam `primaryKey`, `moduleName`, `businessName`
- Nomes de componentes não padronizados geram Vue warn

## Solução
- Adicionados os campos e renomeados componentes para `InformationPushDetail` e `InformationPushChangeDetail`

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/051.md
- Arquivos: supervision/unblock/InformationPush/detail.vue, mixins/detailMixins.js, supervision/unblock/InformationPush/changeDetail.vue, api/InformationPush.js, supervision/unblock/noticeChange/detail.vue, api/InformationPushChange.js, mixins/form.js, supervision/unblock/notice/detail.vue
- Projeto: 苏州市房地产监测V3; sessão: b2283e1b-5660-4ecc-9c6b-175b05319777; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "infopush_detail_missing_fields",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->