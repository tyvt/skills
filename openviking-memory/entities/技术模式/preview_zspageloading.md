# preview.vue referencia ZsPageLoading ausente
O `preview.vue` referencia `@/components/ZsPageLoading/ZsPageLoading.vue`, inexistente no projeto atual; resolvido copiando o componente do projeto Wuxi urbano.

## 问题根因
- `preview.vue` referencia `@/components/ZsPageLoading/ZsPageLoading.vue`
- O projeto atual `zhi2-mobile-admin-h5-c-unlimited` não possui esse componente

## 解决方案
- Copiado `ZsPageLoading.vue` de `无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/components/ZsPageLoading/` para o diretório correspondente do projeto atual

## 验证与归属
- 验证证据: extracted source=cursor session=50bd54d9-da06-4e47-b5a7-b5123d1eb366
- 涉及文件: src/pages_benefit/operationReport/preview.vue, src/components/ZsPageLoading/ZsPageLoading.vue, src/pages.json, src/pages_benefit/benefit/index.vue, src/pages_property/gauge/index.vue
- 所属项目: Huishan Fase 2 H5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "preview_zspageloading",
  "source_extraction_id": "17091e7715aa4ddb9e280040c40385ed",
  "version": 1,
  "memory_type": "entities"
}
-->