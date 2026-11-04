- `showHomeNavMenu` originalmente só verificava `isSuperAdmin` e não `layoutVariant`, causando exibição indevida da barra de menu no layout de empresa em desenvolvimento.
- Em `homeDataMixin.js`, exibir o menu apenas quando super_admin E `layoutVariant === 'admin'`; restaurar a chamada `resolveHomeLayoutVariant(...)`.
- 涉及文件: homeDataMixin.js, HomeNavMenu.vue, layout/index.vue, index-new.vue, config/homeLayout.js, store/getters.js, utils/portalLayout.js, store/modules/permission.js
- Sessão de origem: 26455e70-8674-4b7e-8d89-82798ecab4f1

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Menu de navegação e variante de layout",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "preferences"
}
-->