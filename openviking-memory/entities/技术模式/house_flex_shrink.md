# display:flex centralizado faz subcomponente encolher em miniprograma
No projeto 苏住房C (zhi2-mobile-shimin), `.house-page` com flex centralizado fazia subcomponentes encolherem em vez de preencher.

## 问题根因
- `.house-page` em `pages_owner/house/detail.vue` usa `display: flex` + `align-items: center`
- Subcomponentes de miniprograma encolhem ao conteúdo em vez de preencher

## Correção
- Mudar para layout de bloco em fluxo com padding `20rpx`
- Definir `width: 100%` para o botão inferior

## 验证与归属
- 所属项目: 苏住房C (zhi2-mobile-shimin)
- Sessão de origem: a0fa70c1-04b5-4e88-bb03-c924fab3eae3
- 涉及文件: src/pages_owner/house/detail.vue, src/components/commonNew/baseCard.vue, src/pages_owner/house/components/CellCard.vue, src/pages_owner/house/owner/detail.vue, src/pages_owner/house/index.vue, src/components/ZsButton/ZsButton.vue, src/pages_owner/house/components/registerInfo.vue, src/pages.json
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_flex_shrink",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->