# Supervision Detail Zone API Mismatch
O dropdown de área de supervisão ficava sem valores devido a referência de API não unificada no zhi2-web-admin.

## 描述
- Arquivo `zhi2-web-admin/src/views/supervision/agreement/version/detail.vue` referenciava `@/api/zone/zone.js` incorretamente.
- O dropdown de zona/área subordinada não carregava valores.

## 问题根因
- Referência de API divergente do `index.vue` que usa `@/api/system/zone`.
- Lógica de carregamento de lista não estava alinhada.

## 解决方案
- Alterado para `@/api/system/zone` para alinhar com `index.vue`.
- Corrigida a lógica de carregamento list.

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/069.md
- 涉及文件: supervision/agreement/version/detail.vue, benefit/pubRegAccountChange/detail.vue, presale/entrustSale/detail.vue, api/zone/zone.js, api/system/zone.js, property/propertyAccount/detail.vue, api/index.js, mixins/detailMixins.js
- 所属项目: 苏州市房地产监测V3; Sessão: ff916423-d72a-4b4e-b8d0-925acbfa29d1; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_detail_zone_api",
  "source_extraction_id": "871325fa12334107afbf4d507d0400dd",
  "version": 1,
  "memory_type": "entities"
}
-->