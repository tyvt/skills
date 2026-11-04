# Notice Empty State
Padronização do estado vazio das páginas de avisos para usar o componente NoticeList.

## Mudança
- Removido o componente ZsEmpty duplicado das páginas de aviso de projeto, comunidade e subdistrito
- Três páginas de lista de avisos usam NoticeList para renderizar estado vazio
- Evita exibição dupla de "暂无数据" (sem dados)

## Arquivos envolvidos
- src/pages_owner/project/announcement/index.vue
- src/pages_owner/community/announcement/index.vue, components/NoticeList.vue
- src/pages_owner/subdistrict/announcement/index.vue
- src/components/ZsEmpty/ZsEmpty.vue, src/pages_owner/committee/application/announcement.vue
- src/pages_owner/subdistrict/components/InfoEntry.vue, src/hooks/useLoadMore.js

## Origem
- Sessão de origem: 53374cb4-01f1-44e3-b0b4-f4cca8826844
- 所属项目: zhi2-mobile-shimin

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "notice_empty_state",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "entities"
}
-->