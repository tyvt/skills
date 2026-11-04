# Conflito de nome entre prop e propriedade computada de mixin
`AgencyBasicInfoDetail` mistura `detailMixins` cuja propriedade computada `mode` conflita com prop `mode` do componente, causando sobrescrita.

## Correção
- Prop renomeado para `detailScope`
- `loadDetail` usa `this.detailScope === 'admin'` para decisão
- Componente referenciado `toB/agencyRecord/detail.vue` não precisa de mudança

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3/262.md
- 涉及文件: AgencyBasicInfoDetail.vue, mixins/detailMixins.js, toB/agencyRecord/detail.vue, DeveloperBasicInfoDetail.vue, mixins/form.js, mixins/formComponents.js
- 所属项目: 苏州市房地产监测V3; sessão: d7c5546b-aa33-4b71-aad6-e797b69bb1eb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prop_mixin_mode",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->