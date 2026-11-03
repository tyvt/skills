# Componente de detalhe sobrescreve init sem chamar getDetail
No projeto 苏州市房地产监测V3, os arquivos `staffManagement/components/detail.vue` e `toB/personnelRecord/components/detail.vue` sobrescrevem `init()` do `detailMixins` tratando apenas lógica de adição, sem chamar `getDetail()` na visualização/edição, causando falta de requisição de detalhes.

## Causa raiz
- `zhi2-web-admin/src/views/company/staffManagement/components/detail.vue` sobrescreve `detailMixins.init()` tratando apenas adição
- `zhi2-web-admin/src/views/toB/personnelRecord/components/detail.vue` também não chama `getDetail()` ao visualizar/editar
- Causa falta de requisição de detalhes ao abrir

## Correção
- Acrescentar verificação `getId()` e chamar `getDetail()` ao final do `init()`

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/110.md
- Arquivos: 路由信息.json, src/api/company/personnelRecord.js, personnelListManageMixin.js, staffManagement/components/index.vue, staffManagement/components/detail.vue, listMixins.js, detailMixins.js, staffManagement/personnelRecordApply/index.vue
- Projeto: 苏州市房地产监测V3; sessão: d82ce8b3-d375-424f-ba1f-1a0ccfc69dc2; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "detail_init_getdetail",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->