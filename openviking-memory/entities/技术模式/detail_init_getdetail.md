# Componente de detalhe sobrescreve init sem chamar getDetail
No projeto 苏州市房地产监测V3, os arquivos `staffManagement/components/detail.vue` e `toB/personnelRecord/components/detail.vue` sobrescrevem `init()` do `detailMixins` tratando apenas lógica de adição, sem chamar `getDetail()` na visualização/edição, causando falta de requisição de detalhes.

## 问题根因
- `zhi2-web-admin/src/views/company/staffManagement/components/detail.vue` sobrescreve `detailMixins.init()` tratando apenas adição
- `zhi2-web-admin/src/views/toB/personnelRecord/components/detail.vue` também não chama `getDetail()` ao visualizar/editar
- Causa falta de requisição de detalhes ao abrir

## Correção
- Acrescentar verificação `getId()` e chamar `getDetail()` ao final do `init()`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/110.md
- 涉及文件: 路由信息.json, src/api/company/personnelRecord.js, personnelListManageMixin.js, staffManagement/components/index.vue, staffManagement/components/detail.vue, listMixins.js, detailMixins.js, staffManagement/personnelRecordApply/index.vue
- 所属项目: 苏州市房地产监测V3; sessão: d82ce8b3-d375-424f-ba1f-1a0ccfc69dc2; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_init_getdetail",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->