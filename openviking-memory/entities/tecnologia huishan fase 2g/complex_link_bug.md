# Bug de ligação para detalhe do projeto em estatísticas de usuário
A coluna "物业管理区域" era texto e não saltava para o detalhe do projeto, tendo sido corrigida para ligação.

## 问题
- Coluna "物业管理区域" (complexName) em zhi2-web-admin/src/views/property/userStatistics/index.vue era do tipo text.
- Faltava projectId ao acionar o salto, provocando aviso de parâmetro inválido.

## 解决方案
- Importar getRouterPathByFilePath no vue.
- complexName passa a type:'link' que dispara handleViewProject.
- Abrir building/project/detail com projectId e query formMode:'view'.
- Se faltar projectId, mostrar aviso de parâmetro inválido.

## 验证与归属
- 验证证据: cursor session 00d6a1e4-2062-4ab5-8de7-905e9b2376e6
- Ficheiros: zhi2-web-admin/package.json, zhi2-web-admin/src/views/property/userStatistics/index.vue, zhi2-web-admin/src/views/property/ctUserIdentityApply/bindTable.vue, zhi2-web-admin/src/views/property/ctUserIdentityApply/index.vue, zhi2-web-admin/src/views/property/ownerBindQuery/index.vue, zhi2-web-admin/src/views/building/project/index.vue, zhi2-web-admin/src/views/property/complex/components/rangeTable.vue, zhi2-web-admin/src/mixins/listMixins.js
- 所属项目: 惠山二期G

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Huishan Fase 2G",
  "name": "complex_link_bug",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "entities"
}
-->