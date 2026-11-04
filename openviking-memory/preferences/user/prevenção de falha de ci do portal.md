- Antes de commitar no portal, executar `git add portalTheme.js` para evitar falha de build no CI (arquivo não rastreado causava erro)
- Casos E2E existentes de cabeçalho verde devem continuar afirmando o título «可售房屋展示»
- Contexto:改造 de cores do cabeçalho do portal; deep link `?portal=houses` sem `portalSegment` exibia azul incorreto
- Arquivos: portalTheme.js, PortalDialogHost.vue, UnifiedLogin.vue, PropertyPages.vue
- Sessão: b642c935-7aec-4bc3-b375-5091c39f01f7

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Prevenção de falha de CI do portal",
  "source_extraction_id": "dd37fc1ce95e4bc7ac6e21d7160d2ee6",
  "version": 1,
  "memory_type": "preferences"
}
-->