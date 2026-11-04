# Campos ausentes em detail.vue causam aviso Vue
No projeto 苏州市房地产监测V3, `detail.vue` e `changeDetail.vue` de InformationPush ausentam `primaryKey`, `moduleName`, `businessName` e têm nomes irregulares, gerando Vue warn.

## 问题根因
- `detail.vue` e `changeDetail.vue` de supervision/unblock/InformationPush ausentam `primaryKey`, `moduleName`, `businessName`
- Nomes de componentes não padronizados geram Vue warn

## 解决方案
- Adicionados os campos e renomeados componentes para `InformationPushDetail` e `InformationPushChangeDetail`

## Verificação
- 验证证据: src=苏州市房地产监测V3-rest/051.md
- 涉及文件: supervision/unblock/InformationPush/detail.vue, mixins/detailMixins.js, supervision/unblock/InformationPush/changeDetail.vue, api/InformationPush.js, supervision/unblock/noticeChange/detail.vue, api/InformationPushChange.js, mixins/form.js, supervision/unblock/notice/detail.vue
- 所属项目: 苏州市房地产监测V3; sessão: b2283e1b-5660-4ecc-9c6b-175b05319777; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "infopush_detail_missing_fields",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->