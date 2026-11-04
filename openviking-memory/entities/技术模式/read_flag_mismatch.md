# Inconsistência de marcação de mensagem lida e verificação na página inicial
No app móvel de gestão imobiliária B-end, os detalhes da mensagem não chamavam updateReadFlag para marcar como lida e a verificação de não lida na página inicial era inconsistente com a lista; corrigido com nova marcação e ajuste de verificação.

## 问题根因
- Os detalhes da mensagem não chamavam updateReadFlag para marcar como lida
- A verificação de não lida em applyMessages na página inicial era originalmente readFlag!=='1', inconsistente com a lista

## 解决方案
- Adicionado markMessageRead em src/pages/message/index.vue com atualização da lista em onShow
- Alterado src/pages/home/index.vue para readFlag==='0'

## Verificação e atribuição
- 验证证据: src=物业手持B端/004.md
- 涉及文件: src/pages/home/index.vue, src/pages/message/index.vue, src/pages/message/detail.vue, src/api/msg.js, src/api/home.js, package.json
- Sessão de origem: a15deb31-e978-46bc-a0d9-a8b7c5050469; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "read_flag_mismatch",
  "source_extraction_id": "926ca69557244270b1d93c4505f97348",
  "version": 1,
  "memory_type": "entities"
}
-->