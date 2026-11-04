# HomeBizSection com altura total esconde seções secundárias
Todas as HomeBizSection receberam height:100% e flex:1, fazendo a coluna de imóveis comerciais ocupar tudo e esconder imóveis usados/locacao.

## 问题根因
- Todas as HomeBizSection receberam height:100% e flex:1
- Coluna de imóveis comerciais ocupa tudo e esconde seções secundárias de imóveis usados/locacao

## Correção
- stretch ativado apenas na linha secundária
- biz-center com seções secundárias usa grid(auto+1fr)
- barra lateral do lado da corretora adiciona stretch em seções lado a lado

## Arquivos envolvidos
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue
- zhi2-web-admin/src/views/home/components/HomeBizSection.vue
- zhi2-web-admin/src/views/home/components/HomeQuickLinks.vue
- zhi2-web-admin/src/views/home/styles/homeCard.scss
- zhi2-web-admin/src/views/home/index-new.vue

## 验证与归属
- 验证证据: extração de sessão cursor
- 所属项目: portal; sessão: 94cb407a-5b39-4218-8e57-162fde013753

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_section_stretch",
  "source_extraction_id": "f86567dce52645b8804500e484bf9fdb",
  "version": 1,
  "memory_type": "entities"
}
-->