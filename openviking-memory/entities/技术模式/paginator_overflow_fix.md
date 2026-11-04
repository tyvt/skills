# paginator_overflow_fix
Paginação do lado esquerdo do diálogo de imóveis tinha layout com sizes e todas páginas, causando estouro de largura.

## 问题根因
- Paginação no diálogo de imóveis usava layout com sizes e páginas completas, estourando largura

## 解决方案
- Alterar layout para prev, pager, next, jumper removendo dropdown de itens por página
- Manter pager-count="5" do Element UI para recolher acima de 5 páginas e reduzir largura
- Fixar 10 itens por página

## Arquivos envolvidos
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/houseTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/unit/components/BuildingTableDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/unit/components/HouseScopeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/unitTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/HouseScopeDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-pagination/zs-pagination.vue

## Verificação
- 验证证据: src=园区公共收益/021.md
- Sessão de origem: f087205d-f215-464e-b55c-d86410257745; base de código: none
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "paginator_overflow_fix",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "entities"
}
-->