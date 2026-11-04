# Reset de flag no homeDataMixin faz menu superior reaparecer
O homeDataMixin define hideLayoutChrome=true em created e volta para false em beforeDestroy, fazendo o menu horizontal superior reaparecer ao sair da home.

## 问题根因
- homeDataMixin define hideLayoutChrome=true em created
- Volta para false em beforeDestroy
- Menu horizontal superior reaparece ao sair da home

## Correção
- portalLayout.js sem menu horizontal no lado administrativo
- syncHideLayoutChrome após login
- homeDataMixin restaura apenas ao sair em não administrativo
- TagsView/GenerateRoutes usam árvore completa da barra lateral

## Arquivos envolvidos
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/settings.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/store/modules/app.js
- zhi2-web-admin/src/store/modules/permission.js
- zhi2-web-admin/src/layout/components/Sidebar/index.vue

## 验证与归属
- 验证证据: extração de sessão cursor
- 所属项目: portal; sessão: 40f4d280-b5c1-4c8e-8477-9f099246ba53

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_mixin_chrome",
  "source_extraction_id": "f86567dce52645b8804500e484bf9fdb",
  "version": 1,
  "memory_type": "entities"
}
-->