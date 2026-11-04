# Subtabela mistura listMixins sem propriedade declarada gera aviso Vue
No projeto Suzhou Real Estate Monitoring V3 (zhi2-web-admin), `PresaleBuildingTable.vue` como subtabela misturou `listMixins` e em `created` usou `this.$set` para montar dinamicamente `queryParams` não declarado em `data`, disparando aviso Vue 2.

## 问题根因
- `PresaleBuildingTable.vue` misturou `listMixins` como subtabela
- Em `created`, `this.$set` montou dinamicamente `queryParams` não declarado em `data`
- Isso disparou aviso do Vue 2

## 解决方案
- Removidos o import de `listMixins` e a configuração `mixins` de `PresaleBuildingTable.vue`
- `PresaleHouseTable.vue` deve ter remoção semelhante se houver mesmo uso incorreto

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3/286.md
- 涉及文件: PresaleSelectBuildingDialog.vue, listMixins.js, table.js, PresaleBuildingTable.vue, main.js, PresaleHouseTable.vue
- 所属项目: Suzhou Real Estate Monitoring V3; sessão: 69921419-8a4f-4e43-b9d8-780e617536da; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_listmixins_undeclared_prop",
  "source_extraction_id": "ea52cb840c62465ab3fb0dba5f6a6e78",
  "version": 2,
  "memory_type": "entities"
}
-->