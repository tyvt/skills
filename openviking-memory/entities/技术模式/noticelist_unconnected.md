# NoticeList.vue não conectado ao fluxo de notificação da página inicial
No app móvel de gestão imobiliária B-end, a lógica do ponto vermelho de notificação na página inicial está em home/index.vue e NoticeList.vue é um componente antigo não conectado; as interfaces de mensagem dependem de home.js e msg.js.

## Componentes
- A lógica do ponto vermelho de notificação na página inicial está em src/pages/home/index.vue
- NoticeList.vue é um componente antigo não conectado ao fluxo atual

## Dependências de interface
- As interfaces de mensagem dependem de src/api/home.js e src/api/msg.js

## Verificação e atribuição
- 验证证据: extracted source=cursor session=652779ed-8494-4c1a-86e5-496e1851f191
- 涉及文件: src/pages/home/index.vue, src/pages/message/index.vue, src/pages/message/detail.vue, src/api/msg.js, src/api/home.js, src/components/CustomTabbar/CustomTabbar.vue, src/pages/announcement/index.vue, src/pages.json
- Sessão de origem: 652779ed-8494-4c1a-86e5-496e1851f191; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "noticelist_unconnected",
  "source_extraction_id": "926ca69557244270b1d93c4505f97348",
  "version": 1,
  "memory_type": "entities"
}
-->