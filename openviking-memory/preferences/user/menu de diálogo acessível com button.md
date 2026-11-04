- Antes de fundir `UnifiedLoginMenuMoreDialog.vue` com `UnifiedLogin.vue`, tratar acessibilidade e problema de `key`.
- Alterar itens de menu `<li @click>` para `<button>` ou completar com `role`/`tabindex` e eventos de teclado; no `v-for` do submenu proibir `index` como `:key`.
- Centralizar a normalização do modelo duplo `links`+`previewCount` e `children`.
- Arquivos: UnifiedLoginMenuMoreDialog.vue, UnifiedLogin.vue, ExternalInfoDialog.vue, tests/e2e/unified-login-visual.spec.ts
- Sessão de origem: ecbf0459-d7d2-4d99-934b-c0bdf8b4c2cb

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Menu de diálogo acessível com button",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "preferences"
}
-->