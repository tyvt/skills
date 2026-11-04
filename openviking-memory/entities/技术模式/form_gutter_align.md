
# Itens de formulário exigem gutter e label-width alinhados
No projeto 苏州市房地产监测V3, `template/detail.vue` recebe `:gutter="24"` e `label-width="140px"`; todos os `el-col` ficam dentro de `<el-row :gutter="24">` para alinhar ao layout de três colunas de `versionManagement/detail.vue`.

## Implementação
- O container externo `detail-from-container` em `template/detail.vue` recebe `:gutter="24"`
- `label-width` definido como `140px`
- Todos os `el-col` são envolvidos por `<el-row :gutter="24">`
- Objetivo: alinhar com o layout de três colunas de `versionManagement/detail.vue`

## Verificação e afiliação
- 验证证据: extracted source=cursor session=296f20bf-9014-411d-b3b7-10c9a3853b30
- 涉及文件: commercialHousingSales/presale/template/detail.vue, versionManagement/detail.vue, contractRevoke/detail.vue, projectManagement/buildinginfo/detail.vue, e2e/fixtures/contract-template-menu-config.js, vite.config.js, 路由信息.json, e2e/fixtures/contract-template-helpers.js
- 所属项目: 苏州市房地产监测V3; Sessão: 296f20bf-9014-411d-b3b7-10c9a3853b30; Baseline: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_gutter_align",
  "source_extraction_id": "6433a7001a3e48e3b87e2ed8833cfa99",
  "version": 1,
  "memory_type": "entities"
}
-->