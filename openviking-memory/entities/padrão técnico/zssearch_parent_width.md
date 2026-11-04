# Largura percentual não expande caixa de busca sem largura do pai
No projeto 苏住房C (zhi2-mobile-shimin), `ZsSearch` não expandia quando o pai não tinha largura explícita.

## Causa Raiz
- O pai de `ZsSearch` (subjacente `uni-search-bar`) não tinha largura explícita
- Apenas `width: 100%` em `.uni-searchbar` não expandia a caixa

## Correção
- Usar `w-660` (660rpx) para envolver a caixa de busca
- Alterar `.page-top` para layout centralizado alinhado a `goodProject/index`

## Verificação e Origem
- Projeto: 苏住房C (zhi2-mobile-shimin)
- Sessão de origem: 1fdb1e84-2130-4a0e-9e11-7525a8813edf
- Arquivos: src/pages_transaction/houseVideo/index.vue, src/components/ZsSearch/ZsSearch.vue, src/pages_transaction/goodProject/index.vue, src/pages_transaction/newHouse/index.vue, src/pages_owner/community/announcement/index.vue, src/pages_transaction/intention/search.vue, src/pages_transaction/components/ZsPaging/ZsPaging.vue, src/pages_transaction/newHouse/indexMore.vue
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "zssearch_parent_width",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->