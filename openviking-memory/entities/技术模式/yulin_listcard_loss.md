# Fusão do ramo Yulin perdeu camada list-card em 4 páginas
O ramo base `develop/v2.6.2` já tinha `syncObligee/index.vue` sem `list-card`; a fusão do ramo personalizado Yulin perdeu adicionalmente a camada `list-card` de 4 páginas.

## 问题根因
- O ramo base `develop/v2.6.2` já tinha `syncObligee/index.vue` sem `list-card`
- A fusão do ramo `develop/v2.6.2-yulin` com alterações de `getQueryParams` do lado B perdeu adicionalmente a camada `list-card` de 4 páginas (registro/alteração de área de propriedade, autorização de edifício e sincronização de titular)

## 解决方案
- Readicionar `list-card` nas páginas correspondentes para restaurar a borda da lista

## 验证与归属
- Tipo de memória: bug
- 验证证据: src=产品2.0/033.md
- 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/property/complex/index.vue, src/views/property/complex/components/RegionTreeLayout.vue, src/components/zs-table/zs-table.vue, src/styles/index.scss, src/mixins/listMixins.js, src/views/property/subdistrict/index.vue, src/views/property/wasteAccount/index.vue, src/views/property/complexBuildingAuth/index.vue
- 所属项目: 产品2.0; sessão: 7ae7d4b9-281a-4316-bf51-824355179604; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yulin_listcard_loss",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->