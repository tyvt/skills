# Clique no cartão de usuário em home.vue dispara login complementar
Em `home.vue`, o bloco `user-card` chama `handleUserEntry`; `goLogin()` aciona `detectMiniProgramEnv()` e `initMiniProgramMessageListener()`, reenviando `requestLogin` após `WeixinJSBridgeReady` quando ponte não está pronta.

## Comportamento
- `user-card` inteiro vinculado a `handleUserEntry`
- `goLogin()` chama `detectMiniProgramEnv()` e `initMiniProgramMessageListener()`
- Se ambiente `miniprogram` e ponte não pronta, `requestLogin` reenviado após `WeixinJSBridgeReady`
- Cada clique retorna toast claro

## Arquivos e Verificação
- 验证证据: src=i淮安公版/001.md
- 涉及文件: src/pages/index/home.vue, vite.config.ts, src/store/user.js, src/store/house.js, src/pages/index/property.vue, src/api/security.js, src/pages/login/index.vue, index.html
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_vue_user_card_login",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->