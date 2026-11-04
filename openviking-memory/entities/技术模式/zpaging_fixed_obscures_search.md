# z-paging com fixed padrão cobre busca
`z-paging` usa `fixed=true` por padrão, renderizando em tela cheia e cobrindo navegação de busca externa.
## Contexto
- Afeta arquivos como `newHouse/index.vue`, `newHouse/indexMore.vue`, `newHouse/houseTypeList.vue`, `goodProject/index.vue`.
- 所属项目: zhi2-mobile-shimin.
## 解决方案
- Mover busca, navegação e filtros para o slot `#top` do `z-paging`, mantendo lista com scroll independente.
## Verificação
- Sessão cursor 671da04e-7711-4f45-b4cb-a4bcab90d503 registrou a correção.
- 涉及文件: gridNav.vue, conditionScreening.vue, ZsPaging.vue, etc.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zpaging_fixed_obscures_search",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "entities"
}
-->