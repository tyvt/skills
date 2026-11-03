# Subtabela mistura listMixins sem propriedade declarada gera aviso Vue
No projeto Suzhou Real Estate Monitoring V3 (zhi2-web-admin), `PresaleBuildingTable.vue` como subtabela misturou `listMixins` e em `created` usou `this.$set` para montar dinamicamente `queryParams` não declarado em `data`, disparando aviso Vue 2.

## Causa raiz
- `PresaleBuildingTable.vue` misturou `listMixins` como subtabela
- Em `created`, `this.$set` montou dinamicamente `queryParams` não declarado em `data`
- Isso disparou aviso do Vue 2

## Solução
- Removidos o import de `listMixins` e a configuração `mixins` de `PresaleBuildingTable.vue`
- `PresaleHouseTable.vue` deve ter remoção semelhante se houver mesmo uso incorreto

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-leftover/086.md
- Arquivos: PresaleSelectBuildingDialog.vue, listMixins.js, table.js, PresaleBuildingTable.vue, main.js, PresaleHouseTable.vue
- Projeto: Suzhou Real Estate Monitoring V3; sessão: 69921419-8a4f-4e43-b9d8-780e617536da; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "subtable_listmixins_undeclared_prop",
  "source_extraction_id": "0ec9de86592745d2954137491ac6674b",
  "version": 1,
  "memory_type": "entities"
}
-->